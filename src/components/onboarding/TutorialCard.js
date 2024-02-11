import tutorialCardStyle from './tutorialcard.module.css'

function GenericCard({title, text}) {
    return <div className={tutorialCardStyle["tutorial-card"]} id="tutorial-card">
      <div className={tutorialCardStyle["tutorial-scroll"]}>
          <div className={tutorialCardStyle["tutorial-title"]} id="tutorial-title">{title}</div>
          <div className={tutorialCardStyle["tutorial-block"]} id="tutorial-block">{text}</div>
        </div>
      </div>;
  }

export default GenericCard