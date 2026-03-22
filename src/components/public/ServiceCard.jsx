import './ServiceCard.css';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card card">
      <div className="service-icon">{service.icon}</div>
      <h3>{service.name}</h3>
    </div>
  );
};

export default ServiceCard;