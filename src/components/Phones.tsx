import { useEffect, useState } from "react";


function Phones() {
    type Telefon = {
        id: number;
        nev: string;
        gyarto: string;
        ar: number;
        memoria: number;
    }

    const [telefonok, setTelefonok] = useState<Telefon[]>([])
    const [novekvo, setNovekvo] = useState(false)


    useEffect(()=>{
        async function adatokBetoltese(){
            try{
                const valasz = await fetch("/phones.json")
                const adatok: Telefon[] = await valasz.json();
                setTelefonok(adatok)
                console.log("Adatok sikeres betöltése")
            } catch(err){
                console.error(err)
            }
        }
        adatokBetoltese();
    }, []);
    useEffect (()=>{
        if(novekvo){
            setTelefonok(telefonok.toSorted((a,b) => a.nev.localeCompare(b.nev)))
        }else{
            setTelefonok(telefonok.toSorted((a,b) => b.nev.localeCompare(a.nev)))
        }
    }, [novekvo])
    return (
        <>
        <h2>Telefon lista</h2>
        <table>
            <thead>
                <tr>
                    <td>Név</td>
                    <td>Gyártó</td>
                    <td>Ár</td>
                    <td>Memória</td>
                </tr>
            </thead>
            <tbody>

            {telefonok.map(item=> (
                <tr key={item.id}>
                    <td>{item.nev}</td>
                    <td>{item.gyarto}</td>
                    <td>{item.ar}</td>
                    <td>{item.memoria}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <button onClick={()=>{setNovekvo(!novekvo)}}>Rendezés</button>
        </>


    )
}

export default Phones