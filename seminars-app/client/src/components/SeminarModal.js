import React, { useState } from 'react';
import axios from 'axios';
import './css/SeminarModal.css'; // Подключаем стили

const SeminarModal = ({ seminar, closeModal, setSeminars }) => {
    const [title, setTitle] = useState(seminar.title);
    const [description, setDescription] = useState(seminar.description);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSeminar = { ...seminar, title, description };

        await axios.put(`http://localhost:3001/seminars/${seminar.id}`, updatedSeminar);
        
        setSeminars(prev => prev.map(s => (s.id === seminar.id ? updatedSeminar : s)));
        closeModal();
    };

    return (
        <>
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal">
                <h2>Редактировать семинар</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Название:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Описание:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={closeModal}>Закрыть</button>
                </form>
            </div>
        </>
    );
};

export default SeminarModal;
