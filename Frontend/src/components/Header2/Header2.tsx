

import styles from "./Header2.module.css";


function Header2() {
    return (
        <div className={styles['header2']}>
            <div className={styles['header2-div2']}>Header 2</div>
            {/* <div className="bg-red-500 text-white text-4xl p-10">
                Tailwind is working!
            </div> */}
        </div>
    );
}

export default Header2;