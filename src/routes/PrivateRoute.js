import { Route, Routes } from "react-router-dom";
import Home from "../components/organism/Home";
import Update from "../pages/Update";
import NotFound from "../pages/Not Found";
import React, { useContext } from "react";
import { UserContext } from "../context/useContext";
// import Logout from "./Logout";

function PrivateRoute() {
  const [state] = useContext(UserContext);

  function fetchData() {
    // Lakukan panggilan API di sini (menggunakan fetch atau XMLHttpRequest)
    fetch("https://example.com/api/data")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
        // Lakukan sesuatu dengan data yang diterima dari API
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function scheduleApiCall() {
    const now = new Date();
    const scheduledTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      9,
      0,
      0
    ); // Setiap hari pukul 12:00

    // Hitung selisih waktu antara sekarang dan waktu terjadwal
    const timeDiff = scheduledTime - now;

    if (timeDiff > 0) {
      // Jadwalkan panggilan API sesuai dengan selisih waktu
      setTimeout(() => {
        fetchData();
        // Setelah panggilan API, jadwalkan ulang untuk hari berikutnya
        scheduleApiCall();
      }, timeDiff);
    } else {
      // Jika waktu terjadwal sudah lewat untuk hari ini, jadwalkan ulang untuk hari berikutnya
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(12, 0, 0, 0);
      const nextDayTimeDiff = tomorrow - now;

      setTimeout(() => {
        fetchData();
        // Setelah panggilan API, jadwalkan ulang untuk hari berikutnya
        scheduleApiCall();
      }, nextDayTimeDiff);
    }
  }

  // Jalankan fungsi scheduleApiCall untuk pertama kali
  scheduleApiCall();

  return (
    <Routes>
      <Route exact path="/update" element={<Update />} />
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PrivateRoute;
