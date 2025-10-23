import { css } from '../../styled-system/css';

export default function Home() {
  return (
    <main
      className={css({
        minH: '100vh',
        backgroundImage:
          'radial-gradient(circle, #e1207a, #df008b, #d9009e, #ce00b3, #bc00ca, #9d14c5, #7d1dbe, #5b22b6, #3b228d, #231d64, #14143b, #050215)',
        color: 'white',
        fontSize: '3xl',
        fontWeight: 'bold',
        paddingTop: '10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      {/* Glass bar */}
      <div
        className={css({
          width: '80%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'rgba(149, 150, 156, 0.2)',
          borderRadius: '3xl',
          padding: '2',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        })}
      >
        {/* Left section (icon + title) */}
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '3',
            fontWeight: 'lighter',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          })}
        >
        <img src="./logo.png" className={css({
          height: "40px"
        })}/>
          <h4 className={css({
            fontSize: 'large ',
            fontFamily: 'var(--font-dm-sans)',
          })}>RUNTIME</h4>
        </div>

        {/* Right section (button link) */}
        <a
          href="#"
          className={css({
            backgroundColor: '#e1207a',
            paddingY: '2',
            paddingX: '5',
            borderRadius: '3xl',
            fontSize: 'sm',
            fontWeight: 'semibold',
            transition: 'all 0.3s ease',
            _hover: {
              backgroundColor: '#e1207a37',
              transform: 'scale(1.02)',
            },
          })}
        >
          Start Monitoring Now
        </a>
      </div>
    </main>
  );
}
