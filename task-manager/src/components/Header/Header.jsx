import './Header.scss';

const Header = ({ taskCount, completedCount }) => {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">
          <span className="header__icon">&#10003;</span>
          Task Manager
        </h1>
        <p className="header__subtitle">Organize suas tarefas de forma simples</p>
        <div className="header__stats">
          <div className="header__stat">
            <span className="header__stat-number">{taskCount}</span>
            <span className="header__stat-label">Total</span>
          </div>
          <div className="header__stat header__stat--completed">
            <span className="header__stat-number">{completedCount}</span>
            <span className="header__stat-label">Concluídas</span>
          </div>
          <div className="header__stat header__stat--pending">
            <span className="header__stat-number">{taskCount - completedCount}</span>
            <span className="header__stat-label">Pendentes</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
