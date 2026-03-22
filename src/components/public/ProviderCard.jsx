import './ProviderCard.css';

const ProviderCard = ({ provider }) => {
  return (
    <div className="provider-card card">
      <h4>{provider.name}</h4>
      {provider.profession && <p className="profession">{provider.profession} • {provider.exp}</p>}
      <div className="rating">
        <span>⭐ {provider.rating}</span>
        <span>({provider.reviews})</span>
        {provider.eta && <span className="eta">⏱ {provider.eta}</span>}
      </div>
    </div>
  );
};

export default ProviderCard;