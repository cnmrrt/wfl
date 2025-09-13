"use client";
import { push, ref, set, onValue, child, get, update, getDatabase, remove, orderByChild } from "firebase/database";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { database } from "../../firebaseConfig";


export default function Firebasedata() {

    const [dataArray, setData] = useState("");
    const listData = Object.values(dataArray);

    // console.log(dataArray.length)

    useEffect(
        () => {
            const dbRef = ref(getDatabase());
            get(child(dbRef, "words")).then((snapshot) => {
                if (snapshot.exists()) {
                    setData(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        [])

    /************* Add Data */
    const [id, setId] = useState("");
    const [word, setWord] = useState("");
    const [content, setContent] = useState("");
    const [en_meta_desc, setMetaDesc] = useState("");
    const [img, setImg] = useState("");


    const handleAddData = () => {
        try {
            // const usersRef = ref(database, "brandsTest");
            const usersRef = ref(database, "words/" + dataArray.length + "");
            // const newDataRef = push(usersRef);

            set(usersRef, {
                id: id,
                word: word,
                content: content,
                en_meta_desc: en_meta_desc,
                img: img
            });
            setId("");
            setWord("");
            setContent("");
            setMetaDesc("");
            setImg("");
            window.location.reload();
        } catch (error) {
            console.error("Firebase error:", error);
        }
    }

    return (
        <main>
            <div>
                <table style={{ fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th>Word</th>
                            <th>Content</th>
                            <th>Meta Desc</th>
                            <th>Img</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData.map((item: any, key: any) => (
                            <tr>
                                <td>{Object.keys(dataArray)[key]}</td>
                                <td id={Object.keys(dataArray)[key] + "id"}>{item.id}</td>
                                <td contentEditable="true" id={Object.keys(dataArray)[key] + "word"}>{item.word}</td>
                                <td contentEditable="true" id={Object.keys(dataArray)[key] + "content"}>{item.content}</td>
                                <td contentEditable="true" id={Object.keys(dataArray)[key] + "en_meta_desc"}>{item.en_meta_desc}</td>
                                <td contentEditable="true" id={Object.keys(dataArray)[key] + "img"}>{item.img}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const db = getDatabase();
                                            remove(ref(db, '/words/' + Object.keys(dataArray)[key]));
                                            window.location.reload();
                                            return
                                        }
                                        }>Remove</button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const idInTable: any = document.getElementById(Object.keys(dataArray)[key] + "id")
                                            const wordInTable: any = document.getElementById(Object.keys(dataArray)[key] + "word")
                                            const contentInTable: any = document.getElementById(Object.keys(dataArray)[key] + "content")
                                            const en_meta_descInTable: any = document.getElementById(Object.keys(dataArray)[key] + "en_meta_desc")


                                            const postData = {
                                                id: idInTable.innerHTML,
                                                word: wordInTable.innerHTML,
                                                content: contentInTable.innerHTML,
                                                meta_desc: en_meta_descInTable.innerHTML,
                                                // pictures: item.pictures != "" && item.pictures != null ? (item.pictures) : [""]

                                            };
                                            const db = getDatabase();
                                            const updates: any = {};
                                            updates["/words/" + Object.keys(dataArray)[key]] = postData;
                                            update(ref(db), updates);
                                            window.location.reload();
                                            return
                                        }
                                        }>Update</button>
                                </td>
                            </tr>


                        ))}
                        <tr>
                            <td></td>
                            <td><input
                                type="text"
                                placeholder="id"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                className=""
                            /></td>
                            <td><input
                                type="text"
                                placeholder="Word"
                                value={word}
                                onChange={(e) => setWord(e.target.value)}
                                className=""
                            /></td>
                            <td><input
                                type="text"
                                placeholder="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className=""
                            /></td>
                            <td><input
                                type="text"
                                placeholder="Meta Desc"
                                value={en_meta_desc}
                                onChange={(e) => setMetaDesc(e.target.value)}
                                className=""
                            /></td>

                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button onClick={handleAddData}>Add Data</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </main>
    )
}