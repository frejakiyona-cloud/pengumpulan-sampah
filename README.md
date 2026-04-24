# ♻️ Sistem Pengumpulan Sampah - SMAK PENABUR Harapan Indah

Sistem pencatatan dan leaderboard program daur ulang untuk SMAK PENABUR Harapan Indah, dikelola oleh **Ecobassadors**. Aplikasi ini memungkinkan siswa untuk mencatat kontribusi sampah daur ulang mereka dan bersaing secara positif untuk mengumpulkan poin demi kelestarian bumi.

## 🌟 Fitur Utama
- **Dashboard Real-time:** Menampilkan total sampah yang terkumpul berdasarkan kategori, jumlah siswa yang berpartisipasi, dan total pengiriman.
- **Papan Peringkat (Leaderboard):** Memotivasi siswa melalui kompetisi sehat (hanya menampilkan kode unik, identitas tetap terjaga).
- **Pembuatan Kode Otomatis:** Pengguna baru mendapatkan kode unik 4 karakter saat melakukan submit pertama kali.
- **Dukungan Berbagai Jenis Sampah:** 
  - 🛍️ Kemasan Plastik (Kg)
  - 🍶 Botol Plastik (Liter)
  - 🫙 Minyak Jelantah (Liter)
  - 📫 Kardus (Kg)
  - 🗂️ Karton (Kg)
  - 📦 Packaging Makanan (Kg)

## 🛠️ Teknologi yang Digunakan
- **Frontend:** React.js, Vite
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (NeonDB)

## 🚀 Panduan Instalasi (Development)

Pastikan kamu sudah menginstal **Node.js** dan memiliki akun **NeonDB** (atau database PostgreSQL lokal).

### 1. Clone Repository
```bash
git clone https://github.com/frejakiyona-cloud/pengumpulan-sampah.git
cd pengumpulan-sampah
```

### 2. Setup Backend
1. Masuk ke folder backend:
   ```bash
   cd backend
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` di dalam folder `backend` dengan konfigurasi berikut:
   ```env
   PORT=5001
   DATABASE_URL="postgresql://<user>:<password>@<host>/<db_name>?sslmode=require"
   ```
4. Jalankan script inisialisasi database (terdapat di `init.sql`) di dalam database PostgreSQL kamu.
5. Jalankan server backend:
   ```bash
   npm run dev
   ```
   *(Backend akan berjalan di `http://localhost:5001`)*

### 3. Setup Frontend
1. Buka terminal baru dan masuk ke folder frontend:
   ```bash
   cd frontend
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server frontend:
   ```bash
   npm run dev
   ```
   *(Frontend akan berjalan di alamat localhost yang diberikan oleh Vite, biasanya `http://localhost:5173`)*

## 📂 Struktur Direktori
- `/frontend`: Berisi seluruh kode antarmuka pengguna (React).
- `/backend`: Berisi logika API server (Express) dan konfigurasi database.
- `/backend/init.sql`: Script untuk membuat tabel database `students` dan `submissions`.

## 🤝 Kontribusi
Aplikasi ini dikembangkan untuk memudahkan proses daur ulang di sekolah. Silakan buat *pull request* jika ingin menambahkan fitur atau memperbaiki bug.

---
*Bersama Kita Jaga Bumi Lebih Bersih 🌱*
