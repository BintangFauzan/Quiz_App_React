# Penjelasan Kode QuizPage.jsx

---

## 1. Import dan State
- Mengimpor `axios` untuk mengambil data dari API.
- Menggunakan React hooks:
  - `useState` untuk menyimpan:
    - `dataQuestions`: array soal dari API
    - `userAnswer`: jawaban user (objek, key 1-10)
    - `shuffledQuestions`: array soal beserta jawaban yang sudah diacak
    - `dataAnswer`: array untuk menyimpan hasil submit jawaban user
    - `errorMessage`: boolean untuk menampilkan pesan error validasi
    - `loading`: status loading saat fetch data
  - `useEffect` untuk menjalankan fetch data saat komponen pertama kali dirender.

## 2. Fetch Data dari API & Acak Jawaban
- Pada `useEffect`, fungsi async `fetchData` dipanggil sekali saat komponen mount.
- Mengambil data soal dari Open Trivia DB API.
- Jika berhasil, data soal disimpan ke `dataQuestions`.
- Untuk setiap soal, jawaban benar dan salah digabung lalu diacak, hasilnya disimpan di property `shuffledAnswers` pada setiap soal.
- Array soal beserta jawaban acak disimpan ke state `shuffledQuestions`.
- Jika gagal, error dicetak ke console.
- Status `loading` diatur sebelum dan sesudah fetch.

## 3. Render Halaman Quiz
- Jika loading, tampilkan pesan loading.
- Jika errorMessage true, tampilkan pesan error (misal: "harap isi semua data").
- Menampilkan background dan card quiz.
- Menampilkan timer statis (belum berjalan otomatis).
- Melakukan map pada `shuffledQuestions` untuk menampilkan setiap soal:
  - Pilihan jawaban diambil dari `shuffledAnswers` (sudah diacak satu kali).
  - Setiap opsi jawaban ditampilkan sebagai radio button.
  - Penamaan radio button unik per soal (`name={'answer'+(index+1)}`) agar user hanya bisa memilih satu jawaban per soal.
  - Jawaban user tersimpan di state `userAnswer` melalui handler `handleAnswerChange`.
- Menampilkan progress bar dan persentase statis.

## 4. Submit & Validasi Jawaban
- Terdapat tombol submit ("Simpan") di bawah form.
- Saat submit, fungsi `handleSubmitAnswer` akan:
  - Melakukan validasi: jika ada jawaban yang belum diisi, set `errorMessage` ke true dan otomatis hilang setelah 1 detik.
  - Jika validasi lolos, jawaban user disimpan ke state `dataAnswer`.

## 5. Catatan Pengembangan
- Timer dan progress bar masih statis, bisa dikembangkan agar dinamis.
- Skor dan feedback jawaban belum ditampilkan.
- Pesan error validasi sudah muncul dan otomatis hilang setelah 1 detik.

---

**Kesimpulan:**
Kode sudah dapat mengambil soal, mengacak jawaban satu kali, menyimpan jawaban user, dan melakukan validasi submit dengan feedback error yang jelas. Struktur sudah baik untuk dikembangkan lebih lanjut (skor, feedback, timer dinamis, dsb).
