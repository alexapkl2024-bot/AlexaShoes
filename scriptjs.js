
// DATA PRODUK AQULEXA
const daftarProduk = [
    {
        id: 1,
        nama: "AQULEXA Classic",
        harga: 49000,
        deskripsi: "Tumbler simpel untuk aktivitas sehari-hari.",
        foto: "images/produk1.jpg"
    },
    {
        id: 2,
        nama: "AQULEXA Pastel",
        harga: 52000,
        deskripsi: "Pilihan warna lembut dengan tampilan manis.",
        foto: "images/produk2.jpg"
    },
    {
        id: 3,
        nama: "AQULEXA Daily",
        harga: 49000,
        deskripsi: "Model praktis untuk dibawa ke mana saja.",
        foto: "images/produk3.jpg"
    },
    {
        id: 4,
        nama: "AQULEXA Sport",
        harga: 55000,
        deskripsi: "Pilihan tumbler untuk menemani kegiatan aktif.",
        foto: "images/produk4.jpg"
    },
    {
        id: 5,
        nama: "AQULEXA Simple",
        harga: 45000,
        deskripsi: "Tampilan minimalis untuk penggunaan sehari-hari.",
        foto: "images/produk5.jpg"
    },
    {
        id: 6,
        nama: "AQULEXA Cute",
        harga: 52000,
        deskripsi: "Tumbler dengan tampilan menarik untuk koleksimu.",
        foto: "images/produk6.jpg"
    }
];

// FORMAT RUPIAH
function rupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// PINDAH HALAMAN
function bukaHalaman(namaHalaman) {
    const semuaHalaman = document.querySelectorAll(".halaman");

    semuaHalaman.forEach(halaman => {
        halaman.classList.remove("aktif");
    });

    const tujuan = document.getElementById(namaHalaman);

    if (tujuan) {
        tujuan.classList.add("aktif");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}

// TAMPILKAN PRODUK
function tampilkanProduk() {
    const tempatProduk = document.getElementById("daftarProduk");

    tempatProduk.innerHTML = "";

    daftarProduk.forEach(produk => {
        tempatProduk.innerHTML += `
            <div class="produk-card">
                <img src="${produk.foto}" alt="${produk.nama}">
                <h3>${produk.nama}</h3>
                <p>${produk.deskripsi}</p>
                <div class="harga-produk">${rupiah(produk.harga)}</div>
                <button class="btn-utama" onclick="pilihProduk(${produk.id})">
                    Pilih Produk
                </button>
            </div>
        `;
    });
}

// ISI PILIHAN PRODUK DI FORM
function isiPilihanProduk() {
    const pilihan = document.getElementById("pilihanProduk");

    pilihan.innerHTML = '<option value="">Pilih produk</option>';

    daftarProduk.forEach(produk => {
        pilihan.innerHTML += `
            <option value="${produk.id}">
                ${produk.nama} - ${rupiah(produk.harga)}
            </option>
        `;
    });
}

// KLIK PILIH PRODUK
function pilihProduk(id) {
    document.getElementById("pilihanProduk").value = id;
    document.getElementById("jumlahProduk").value = 1;

    hitungTotal();
    document.getElementById("notaPesanan").hidden = true;

    bukaHalaman("pemesanan");
}

// HITUNG TOTAL
function hitungTotal() {
    const idProduk = Number(document.getElementById("pilihanProduk").value);
    const jumlah = Number(document.getElementById("jumlahProduk").value);

    const produk = daftarProduk.find(item => item.id === idProduk);

    const total = produk && jumlah > 0
        ? produk.harga * jumlah
        : 0;

    document.getElementById("totalHarga").textContent = rupiah(total);
}

// NOMOR PESANAN
function buatNomorPesanan() {
    const tanggal = new Date();
    const waktu = tanggal.getTime().toString().slice(-8);

    return "AQL-" + waktu;
}

// PROSES PEMESANAN
document.getElementById("formPesanan").addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("namaPembeli").value.trim();
    const nomor = document.getElementById("nomorPembeli").value.trim();
    const alamat = document.getElementById("alamatPembeli").value.trim();
    const idProduk = Number(document.getElementById("pilihanProduk").value);
    const jumlah = Number(document.getElementById("jumlahProduk").value);
    const pembayaran = document.getElementById("metodePembayaran").value;

    const produk = daftarProduk.find(item => item.id === idProduk);

    if (!nama || !nomor || !alamat || !produk || jumlah < 1 || !pembayaran) {
        alert("Mohon lengkapi seluruh data pemesanan.");
        return;
    }

    const total = produk.harga * jumlah;
    const nomorPesanan = buatNomorPesanan();
    const tanggal = new Date().toLocaleString("id-ID");

    const nota = document.getElementById("notaPesanan");

    nota.innerHTML = `
        <h2>♡ AQULEXA TUMBLER ♡</h2>
        <h3 style="text-align:center;">NOTA PEMESANAN</h3>

        <p><b>Nomor Pesanan:</b> ${nomorPesanan}</p>
        <p><b>Tanggal:</b> ${tanggal}</p>

        <hr>

        <p><b>Nama Pembeli:</b> ${nama}</p>
        <p><b>Nomor HP:</b> ${nomor}</p>
        <p><b>Alamat:</b> ${alamat}</p>

        <table>
            <tr>
                <td><b>Produk</b></td>
                <td>${produk.nama}</td>
            </tr>
            <tr>
                <td><b>Harga</b></td>
                <td>${rupiah(produk.harga)}</td>
            </tr>
            <tr>
                <td><b>Jumlah</b></td>
                <td>${jumlah}</td>
            </tr>
            <tr>
                <td><b>Total</b></td>
                <td><b>${rupiah(total)}</b></td>
            </tr>
            <tr>
                <td><b>Pembayaran</b></td>
                <td>${pembayaran}</td>
            </tr>
        </table>

        <p style="text-align:center; margin-top:20px;">
            Terima kasih telah berbelanja di AQULEXA!<br>
            <b>Stay Hydrated, Stay Lovely!</b>
        </p>

        <button class="btn-utama btn-cetak" onclick="window.print()">
            Cetak / Simpan Nota
        </button>

        <button class="btn-utama btn-cetak" onclick="pesananBaru()">
            Buat Pesanan Baru
        </button>
    `;

    nota.hidden = false;

    nota.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// BUAT PESANAN BARU
function pesananBaru() {
    document.getElementById("formPesanan").reset();
    document.getElementById("jumlahProduk").value = 1;
    document.getElementById("totalHarga").textContent = rupiah(0);
    document.getElementById("notaPesanan").hidden = true;

    bukaHalaman("produk");
}

// EVENT HITUNG TOTAL
document.getElementById("pilihanProduk").addEventListener("change", hitungTotal);
document.getElementById("jumlahProduk").addEventListener("input", hitungTotal);

// TAHUN OTOMATIS
document.getElementById("tahun").textContent = new Date().getFullYear();

// JALANKAN SAAT WEBSITE DIBUKA
tampilkanProduk();
isiPilihanProduk();
hitungTotal();
