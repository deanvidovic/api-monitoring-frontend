import { css } from '../../styled-system/css';
import Body from './body';
import Header from './header';
import DataBar from './data';

export default function Home() {
  return (
    <main
      className={css({
        minH: '100vh',
        backgroundImage:
          'radial-gradient(circle, #050215 0%, #14143b 20%, #231d64 40%, #3b228d 60%, #5b22b6 70%, #7d1dbe 80%, #9d14c5 85%, #bc00ca 90%, #ce00b3 93%, #d9009e 95%, #df008b 97%, #e1207a 100%)',
        color: 'white',
        fontSize: '3xl',
        fontWeight: 'bold',
        paddingTop: '10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })}
    >
      <Header />
      <Body />
      <DataBar />
    </main>
  );
}
