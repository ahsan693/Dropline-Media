import Image from "next/image";
import styles from "./content-creation.module.css";

import mainMockup from "./mainimg.png";
import largeAd from "./left2.png";
import left3 from "./left3.png";
import right1 from "./right1.png";
import smallThumb from "./right3.png";

export default function ContentCreation() {
  return (
    <div className={styles.root}>
      <div className={styles.heroWrap}>
        <div className={styles.mockup}>
          <Image src={mainMockup} alt="Content mockup" className={styles.mainImg} width={560} height={1120} sizes="280px" priority />
        </div>

        {/* Left group */}
        <div className={`${styles.floatCard} ${styles.leftTop} ${styles.fromLeft} ${styles["delay-0"]} ${styles["z-top"]}`}>
          <div className={styles.cardSmall}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div className={styles.statsLabel}>Followers</div>
                <div className={styles.statsNumber}>16.8K</div>
              </div>
              <div style={{background:'#dff5e1',borderRadius:8,padding:'4px 8px',color:'#0a7c3b',fontWeight:700}}>+1.2K</div>
            </div>
          </div>
        </div>

        <div className={`${styles.floatCard} ${styles.leftMid} ${styles.fromLeft} ${styles["delay-1"]} ${styles["z-mid"]}`}>
          <div className={styles.cardMedium}>
            <Image src={largeAd} alt="Ad" className={styles.largeAdImg} width={440} height={440} sizes="220px" />
          </div>
        </div>

        <div className={`${styles.floatCard} ${styles.leftBot} ${styles.fromLeft} ${styles["delay-2"]} ${styles["z-bot"]}`}>
          <div className={styles.cardImageSmall}>
            <Image src={left3} alt="Left float" className={styles.floatImg} width={120} height={120} />
          </div>
        </div>

        {/* Right group */}
        <div className={`${styles.floatCard} ${styles.rightTop} ${styles.fromRight} ${styles["delay-3"]} ${styles["z-top"]}`}>
          <div className={styles.cardImageSmall}>
            <Image src={right1} alt="Right float" className={styles.floatImg} width={120} height={120} />
          </div>
        </div>

        <div className={`${styles.floatCard} ${styles.rightMid} ${styles.fromRight} ${styles["delay-4"]} ${styles["z-mid"]}`}>
          <div className={styles.cardSmall}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div className={styles.statsLabel}>Impressions</div>
                <div className={styles.statsNumber}>47,181</div>
              </div>
              <div style={{background:'#dff5e1',borderRadius:20,padding:'6px 10px',color:'#0a7c3b',fontWeight:700}}>+49%</div>
            </div>
            <div style={{height:8}} />
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div className={styles.statsLabel}>Clicks</div>
                <div className={styles.statsNumber}>1937</div>
              </div>
              <div style={{background:'#dff5e1',borderRadius:20,padding:'6px 10px',color:'#0a7c3b',fontWeight:700}}>+73%</div>
            </div>
          </div>
        </div>

        <div className={`${styles.floatCard} ${styles.rightBot} ${styles.fromRight} ${styles["delay-5"]} ${styles["z-bot"]}`}>
          <div className={styles.cardImageSmall}>
            <Image src={smallThumb} alt="Preview" className={styles.floatImg} width={120} height={120} />
          </div>
        </div>
      </div>
    </div>
  );
}
