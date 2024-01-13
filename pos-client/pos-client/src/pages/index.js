// File: components/Navbar.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/HomePage.module.css';

const Navbar = () => {
  const router = useRouter();

  const handleButtonClick = (path) => {
    // Clear session storage before navigating to the login page
    if (path === '/') {
      sessionStorage.removeItem('isLoggedOut');
    }

    router.push(path);
  };

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Check if the user is trying to navigate back to the login page
      if (url === '/' && sessionStorage.getItem('isLoggedOut')) {
        // Redirect back to the home page (or another page as needed)
        router.replace('/');
      }
    };

    // Listen to route changes
    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup the event listener on component unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <div >
    <div className={styles.body}>
    <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Image src="/polines.png" alt="Logo" width={50} height={50} priority />
        </div>
        <div className={styles.spacer} />
        <ul className={styles.ul}>
        <li className={styles.li} onClick={() => handleButtonClick('/')}>
              Home
            </li>
            <li className={styles.li} onClick={() => handleButtonClick('/#Aboutus')}>
              AboutUs
            </li>
            <li className={styles.li} onClick={() => handleButtonClick('/#tujuan')}>
              Tujuan
            </li>

        </ul>
      </nav>
      <div className={styles.kanan}>
<div className={styles.wrapper}>
<div className={styles.contentContainer}>
  <h2 id="home">Selamat datang di kantin Pintar Polines</h2>
  <h1>Temukan makanan yang sehat</h1>
  <h1>dan bergizi di kantin polines</h1>
  <h2>Pilih & makanlah sesuai kebutuhanmu beli sekarang</h2>
</div>

<div className={styles.keranjang}>
  <Image src="/krj2.png" alt="Keranjang" width={470} height={410} priority />
</div>
</div>  
</div>

      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={() => handleButtonClick('/login')}>
          Go to Login
        </button>
        <button className={styles.button} onClick={() => handleButtonClick('/register')}>
          Go to Register
        </button>
      </div>
    </div>
    {/*  */}
     <div className={styles.body1}>
      <div className={styles.awal}>
      <h1 id="Aboutus">About Us</h1>
      </div>
      <div className={styles.wrapper1}>
      <div className={styles.keranjang1}>
  <Image src="/orangminum.jpeg" alt="Keranjang" width={400} height={300} priority />
</div>
{/* ini berda */}
<div className={styles.contentContainer1}>
    <h1>Apa itu Kantin Pintar Polines</h1>
    <p>
    Kami adalah bagian integral dari lingkungan kampus yang dinamis dan inovatif di Politeknik Negeri Semarang. Dengan bangga, Kantin Pintar Polines hadir sebagai pusat kuliner yang tidak hanya menyediakan makanan lezat, tetapi juga memberikan pengalaman makan yang cerdas dan berkesan bagi seluruh komunitas kampus.
    </p>
</div>
</div>
{/* ini beda */}
<div className={styles.aduh}>
<h4>Alasan Harus Menggunakan Kantin Pintar Polines</h4>
</div>
{/* card */}
<div className={styles.pembungkuscard}>
  <div className={styles.card1}>
    <div className={styles.icon}>
      <Image src="/polines.png" alt="Keranjang" width={50} height={50} priority />
    </div>
    <h2>Menu Beragam</h2>
    <p>Dari hidangan lokal hingga kuliner internasional, kami menyajikan menu beragam untuk memenuhi selera semua orang</p>
  </div>
  <div className={styles.card2}>
    <div className={styles.icon2}>
      <Image src="/polines.png" alt="Keranjang" width={50} height={50} priority />
    </div>
    <h2>lingkungan ramah siswa</h2>
    <p>Kantin Pintar bukan hanya tempat makan, tetapi juga ruang sosial yang nyaman</p>
  </div>
  <div className={styles.card3}>
    <div className={styles.icon3}>
      <Image src="/polines.png" alt="Keranjang" width={50} height={50} priority />
    </div>
    <h2>Teknologi Pintar</h2>
    <p>Sejalan dengan namanya, Kantin Pintar Polines memanfaatkan Teknologi untuk mempermudah proses pembayaran dan pemesanan</p>
  </div>
</div>



     </div>
     {/*  */}
     {/*  */}
     <div className={styles.body2}>
      <div className={styles.awal2}>
      <h1 id="tujuan">Tujuan</h1>
      </div>
      <div className={styles.tujuan}>
      <Image src="/tujuan.jpeg" alt="Keranjang" width={250} height={250} priority />
    </div>
  {/* card */}
  <div className={styles.pembungkuscard2}>
  <div className={styles.card11}>
    <div className={styles.icon}>
      <Image src="/hp.png" alt="Keranjang" width={50} height={50} priority />
    </div>
    <div>
      <h2>Meningkatkan pengalaman Mahasiswa</h2>
      <p>memberikan Mahasiswa pengalaman makan yang modern, efisien, dan menyenankan di lingkungan kampus</p>
    </div>
  </div>
  <div className={styles.card21}>
    <div className={styles.icon2}>
      <Image src="/wifi.png" alt="Keranjang" width={50} height={50} priority />
    </div>
    <div>
      <h2>Penerapan Teknologi untuk efisien</h2>
      <p>memanfaatkan  Teknologi dalam  proses pemesanan, pembayaran, dan manajemen inventaris untuk Meningkatkan efisien oprasional</p>
    </div>
  </div>
  <div className={styles.card31}>
    <div className={styles.icon3}>
      <Image src="/orang.png" alt="Keranjang" width={50} height={50} priority />
    </div>
    <div>
      <h2>Kesehatan dan Kesejahteraan</h2>
      <p>Menyelenggarakan program kesehatan dan kegiatan Kesejahteraan untuk Meningkatkan kesadaran akan pola makan dan gaya hidup sehat antar komunitas kampus</p>
    </div>
  </div>
  <div className={styles.card41}>
    <div className={styles.icon4}>
      <Image src="/meja.png" alt="Keranjang" width={50} height={50} priority />
    </div>
    <div>
      <h2>Mendorong inovasi kuliner</h2>
      <p>Mendukung pengembanga bakat kuliner diantara Mahasiswa dan staf yang terdapat dalam oprasional kantin</p>
    </div>
  </div>
</div>

  {/* selesai */}



</div>
     {/*selesai 2  */}
     <div className={styles.body3}>
  <footer>
    <div className={styles.judul}>
      <h1>KANTIN PINTAR POLINES</h1>
    </div>
    <div className={styles.footer1}>
      <div className={styles.cardfooter}>
        <h3>Our Service</h3>
        <h4 onClick={() => handleButtonClick('/')}>Home</h4>
  <h4 onClick={() => handleButtonClick('/#Aboutus')}>AboutUs</h4>
  <h4 onClick={() => handleButtonClick('/#tujuan')}>Tujuan</h4>
      </div>
      <div className={styles.cardfooter1}>
        <h3>Contact Us</h3>
        <div className={styles.bawahct}>
          <div className={styles.ct1}>
            <Image src="/call.png" alt="Keranjang" width={30} height={30} priority />
          </div>
          <h4>+62 812 9087 5643</h4>
        </div>
        <div className={styles.bawahct}>
          <div className={styles.ct2}>
            <Image src="/ok.png" alt="Keranjang" width={30} height={30} priority />
          </div>
          <h4>kantirpintarpolines@gmail.com</h4>
        </div>
        <div className={styles.bawahct}>
          <div className={styles.ct3}>
            <Image src="/location.png" alt="Keranjang" width={30} height={30} priority />
          </div>
          <h4>kantin kodok polines</h4>
        </div>
        <div className={styles.bawahct}>
          <div className={styles.ct4}>
            <Image src="/restaurant.png" alt="Keranjang" width={30} height={30} priority />
          </div>
          <h4>senin - jumat</h4>
        </div>
        <div className={styles.bawahct}>
          <div className={styles.ct5}>
            <Image src="/clock.png" alt="Keranjang" width={30} height={30} priority />
          </div>
          <h4>07.00 - 17.30</h4>
        </div>
      </div>
    </div>
    <div className={styles.akhir}>
      <h5 >Copyright@2023 Kantin Pintar Polines</h5>
    </div>
  </footer>
</div>

     {/*  */}
    </div>
    
  );
};

export default Navbar;
