import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';

import styles from './Banner.module.scss';

const Banner = () => (
  <SectionPresenter>
    <div className={styles.Banner}>
      <h1>
        Building the Future,
        <br /> One Line of Code at a Time
      </h1>
      <p className={styles.subtitle}>
        As a dedicated developer, I take pride in transforming visionary concepts into tangible
        digital solutions. Every problem is an opportunity, and I&apos;m here to craft innovative,
        code-driven answers that make a difference
      </p>
    </div>
  </SectionPresenter>
);

export default Banner;
