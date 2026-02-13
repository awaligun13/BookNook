import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Navbar.module.css"
import logo from "../assets/Copilot_20260212_200919.png"
import profile from "../assets/Copilot_20260213_101934.png"
import shelf from "../assets/Copilot_20260213_101912.png"
import home from "../assets/Copilot_20260213_103529.png"
import reading from "../assets/Copilot_20260213_105043.png"


export default function Navbar(){
    return (
        <nav className={styles.nav}>
            <Image src = {logo}  height={60} />

            <div className={styles.links}>
                <Link href="/"><Image src = {home} height = {30} />Home</Link>
                <Link href="/profile"><Image src = {profile} height = {30} />Profile</Link>
                <Link href="/shelf"><Image src = {shelf} height = {30} />Shelf</Link>
                <Link href="/reading-room"><Image src = {reading} height = {25} />Reading Room</Link>
            </div>

        </nav>
    )
}