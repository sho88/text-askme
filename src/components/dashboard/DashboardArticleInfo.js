export const DashboardArticleInfo = (props) => {
  return (
    <div className="dasboard-article-info-container">
      <h3>{props.event.header}</h3>
      <p>{props.event.body}</p>
    </div>
  );
};
