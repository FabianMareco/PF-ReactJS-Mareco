const Description = ({ description }) => {
  if (!description) return null;
  return (
    <p className="lead text-muted my-3">{description}</p>
  );
};

export default Description;
