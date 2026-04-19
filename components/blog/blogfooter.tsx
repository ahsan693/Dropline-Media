import styles from "./blogfooter.module.css";

const companyLinks = ["About", "Services", "Work", "Blog", "Contact"];
const socialLinks = ["LinkedIn", "Instagram", "Facebook", "Tiktok"];

export default function BlogFooter() {
  return (
    <footer className={styles.footerSection}>
      <div className="section-shell">
        <div className={styles.footerTop}>
          <div className={styles.footerColumn}>
            <p className={styles.footerHeading}>Company</p>
            <ul className={styles.footerList}>
              {companyLinks.map((item) => (
                <li key={item}>
                  <a href="#" className={styles.footerLink}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <p className={styles.footerHeading}>Follow us</p>
            <ul className={styles.footerList}>
              {socialLinks.map((item) => (
                <li key={item}>
                  <a href="#" className={styles.footerLink}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <p className={styles.footerHeading}>General inquiries</p>
            <p className={styles.footerText}>01263 43444</p>
            <a href="mailto:hello@droplinemedia.ie" className={styles.footerEmail}>
              hello@droplinemedia.ie
            </a>

            <p className={`${styles.footerHeading} ${styles.supportHeading}`}>Client support</p>
            <a href="mailto:clients@droplinemedia.ie" className={styles.footerEmail}>
              clients@droplinemedia.ie
            </a>
          </div>

          <div className={styles.footerColumn}>
            <p className={styles.footerBrand}>Dropline Media</p>
            <p className={styles.footerLegal}>
              © 2026 Dropline Media, a trading name of Sarlem Media Limited | Company
              No. 793477, registered in Ireland. All rights reserved.
            </p>
            <div className={styles.footerPolicyLinks}>
              <a href="#" className={styles.footerLink}>
                Privacy and cookie policy
              </a>
              <a href="#" className={styles.footerLink}>
                Your cookie preferences
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerShowcase}>
          <h2 className={styles.footerTitle}>Dropline Media</h2>
          <p className={styles.footerTagline}>
            ads that <span>convert</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
