import { BurgerMenu } from "./BurgerMenu";
import { WriteNewMessage } from "./WriteNewMessage";

// @TODO: This should be moved to a header...
export default function DashboardComponent() {
  return (
    <header className="head">
      <div className="head-container">
        <BurgerMenu />
        <div className="head-primary-info">
          <h1>Text Q&amp;A</h1>
        </div>
        <WriteNewMessage />
      </div>
      <div className="divider"></div>
    </header>
  );
}
