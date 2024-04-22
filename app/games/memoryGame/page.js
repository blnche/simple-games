'use client'
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/memoryGame.module.css';

export default function Page() {
    const [villagers, setVillagers] = useState([]);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPause] = useState(false);
    const [firstPick, setFirstPick] = useState(null);
    const [matches, setMatches] = useState(0);

    useEffect( () => {    
        loadVillager();
    }, []);

    const loadVillager = async () => {
        try {
            const response = await fetchVillagers();
            const data = await response.json();

            const randomIds = new Set();

            while(randomIds.size < 8) {
                const randomNumber = Math.ceil(Math.random() * 150);
                randomIds.add(randomNumber);
            }

            const selectedVillagers = [];
            for (const id of randomIds) {
                const index = id - 1;
                if(index >= 0 && index < data.length) {
                    selectedVillagers.push(data[index])
                }
            }

            setVillagers([...selectedVillagers, ...selectedVillagers].sort(_ => Math.random() - 0.5));
            
        } catch (err) {
            console.log(err);
        }
    };

    const fetchVillagers = async () => {

        const apiKey = '88bd6425-126c-436d-b101-b216efd3160e';
        const headers = new Headers();
        headers.append('X-API-KEY', apiKey);
        headers.append('Accept-Version', '1.0.0');

        const apiBaseURl = 'https://api.nookipedia.com/villagers';
        const urlWithQuery =  new URL(apiBaseURl);
        urlWithQuery.searchParams.append('game', 'WW');

        return fetch(urlWithQuery, {
            method:'GET',
            headers: headers
        });
    };

    const clickCard = (event) => {
        const villagerCard = event.currentTarget;
        const [front, back] = getFrontAndBackCard(villagerCard);
        if(front.classList.contains(`.${styles.rotated}`) || isPaused) return;

        setIsPause(true);

        rotateElements([front, back]);

        if(!firstPick) {
            setFirstPick(villagerCard);
            setIsPause(false);
        } else {
            const secondVillagerName = villagerCard.dataset.villagername;
            const firstVillagerName = firstPick.dataset.villagername;

            if(firstVillagerName !== secondVillagerName) {
                const [firstFront, firstBack] = getFrontAndBackCard(firstPick);

                setTimeout(() => {
                    rotateElements([front, back, firstFront, firstBack]);
                    setFirstPick(null);
                    setIsPause(false);
                }, 500);
            } else {
                setMatches(matches + 1);
                if(matches === 8) {
                    setScore(score + 1);
                }

                setFirstPick(null);
                setIsPause(false);
            }
        }
    };

    const rotateElements = (elements) => {
        if(typeof elements !== 'object' || !elements.length) return;

        elements.forEach(element => element.classList.toggle(`${styles.rotated}`));
    };

    const getFrontAndBackCard = (card) => {
        const front = card.querySelector(`.${styles.front}`);
        const back = card.querySelector(`.${styles.back}`);
        return [front, back];
    };

    const resetGame = async () => {
        setIsPause(false);
        setFirstPick(null);
        setMatches(0);
        setVillagers([]);

        try {
            await loadVillager();
            
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className='h-full flex flex-col space-y-5'>
            <h2 className='text-xl'>Memory Game</h2>
            <section key={villagers.length} className='grid gap-2 grid-cols-4  justify-around h-full'>
                {villagers.map((villager, index) => {
                    return (
                        <div key={index} className='card bg-base-200 shadow-md' onClick={clickCard} data-villagername={villager.name}>
                            <div className={styles.front}></div>

                            <div className={`${styles.back} ${styles.rotated}`}>
                                <div className={styles.imgWrapper}>
                                    <img src={villager.image_url} alt={villager.name}/>
                                </div>
                                <h2>{villager.name}</h2>
                            </div>
                        </div>
                    )
                })}
            </section>
            <button className='btn btn-primary' onClick={resetGame}> Reset </button>
        </section>
    )
}