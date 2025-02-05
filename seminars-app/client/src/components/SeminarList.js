// src/components/SeminarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SeminarModal from './SeminarModal';
import './css/SeminarList.css'; // Импортируем файл стилей

{/* При выводе изображений из файла seminars.json столкнулся с технической проблемой,
    в ходе решения которой выяснилось, что сайт, с которого берутся изображения недоступен
    в России (в папке images/technical_errors есть скриншот). 
    Данная проблема решается путём использования другого браузера со специальным расширением
    (прикрепил скриншот с выводом изображений в 2-х браузера в папке images/display_images) */ }

const SeminarList = () => {
    const [seminars, setSeminars] = useState([]); // Состояние для хранения списка семинаров
    const [selectedSeminar, setSelectedSeminar] = useState(null); // Состояние для хранения выбранного семинара
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки данных

    // Хук для получения данных семинаров при монтировании компонента
    useEffect(() => {
        const fetchSeminars = async () => {
            const response = await axios.get('http://localhost:3001/seminars'); // Запрос данных семинаров
            setSeminars(response.data); // Обновляем состояние семинаров
            setLoading(false); // Устанавливаем состояние загрузки в false
        };
        fetchSeminars(); // Вызываем функцию для получения данных
    }, []);

    // Функция для удаления семинара
    const deleteSeminar = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот семинар?')) { // Подтверждение удаления
            await axios.delete(`http://localhost:3001/seminars/${id}`); // Отправляем DELETE-запрос на сервер
            setSeminars(seminars.filter(seminar => seminar.id !== id)); // Обновляем список семинаров
        }
    };

    // Функция для открытия модального окна редактирования семинара
    const openEditModal = (seminar) => {
        setSelectedSeminar(seminar); // Устанавливаем выбранный семинар
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        setSelectedSeminar(null); // Сбрасываем выбранный семинар
    };

    // Отображение индикатора загрузки
    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="seminar-list">
            <h1>Список семинаров</h1>
            <ul>
                {seminars.map(seminar => (
                    <li key={seminar.id} className="seminar-item">
                        {/* Вывод изображения семинара */}
                        <img src={seminar.photo} alt={seminar.title} className="seminar-image" />

                        <div className="seminar-details">
                            <h2 className="seminar-title">{seminar.title}</h2>
                            <p className="seminar-description">{seminar.description}</p>

                            {/* Вывод даты и времени семинара */}
                            <p className="seminar-date-time">
                                Дата: {new Date(seminar.date.split('.').reverse().join('-')).toLocaleDateString()}
                            </p>

                            <p className="seminar-date-time">Время: {seminar.time}</p>

                            <div className="seminar-buttons">
                                <button className="seminar-button" onClick={() => deleteSeminar(seminar.id)}>Удалить</button>
                                <button className="seminar-button" onClick={() => openEditModal(seminar)}>Редактировать</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedSeminar && (
                <SeminarModal seminar={selectedSeminar} closeModal={closeModal} setSeminars={setSeminars} />
            )}
        </div>
    );
};

export default SeminarList;
