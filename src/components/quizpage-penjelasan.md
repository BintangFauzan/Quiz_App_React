# Penjelasan Kode QuizPage.jsx

---

## 1. Import dan State
- Mengimpor `axios` untuk mengambil data dari API.
- Menggunakan React hooks:
  - `useState` untuk menyimpan:
    - `dataQuestions`: array soal dari API
    - `userAnswer`: jawaban user (dalam bentuk objek)
    - `loading`: status loading saat fetch data
  - `useEffect` untuk menjalankan fetch data saat komponen pertama kali dirender.

## 2. Fetch Data dari API
- Pada `useEffect`, fungsi async `fetchData` dipanggil sekali saat komponen mount.
- Mengambil data soal dari Open Trivia DB API.
- Jika berhasil, data soal disimpan ke `dataQuestions`.
- Jika gagal, error dicetak ke console.
- Status `loading` diatur sebelum dan sesudah fetch.

## 3. Render Halaman Quiz
- Menampilkan background dan card quiz.
- Menampilkan timer statis (belum berjalan otomatis).
- Melakukan map pada `dataQuestions` untuk menampilkan setiap soal:
  - Jawaban benar dan salah digabung, lalu diacak urutannya.
  - Setiap opsi jawaban ditampilkan sebagai radio button.
  - Penamaan radio button sebaiknya unik per soal.
- Menampilkan progress bar dan persentase statis.

## 4. Catatan Perbaikan
- Penamaan radio button: sebaiknya gunakan `name={`answer-${index}`}` agar user hanya bisa memilih satu jawaban per soal.
- Jawaban user belum tersimpan karena belum ada handler `onChange` dan checked pada radio button.
- Timer dan progress bar masih statis.

---

**Kesimpulan:**
Kode sudah bisa mengambil dan menampilkan soal dari API, namun masih bisa dikembangkan agar lebih interaktif (misal: menyimpan jawaban user, timer dinamis, progress bar dinamis, dsb).
