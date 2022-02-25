import logoImg from '../assets/logo.png';
import '../styles/header.scss';

export function Header() {
  return (
    <header className="headerContainer">
      <div className="headerContent">
        <a href="/"><img src={logoImg} alt="Host a Pet"/></a>
        <h1>Host a Pet</h1>
      </div>
      <div className="headerLogin">
        <p>Login stuff</p>
      </div>
    </header>
  );
}