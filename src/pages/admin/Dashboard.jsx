import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrendingUp, FiUsers, FiCalendar, FiDollarSign, FiCheckCircle, FiClock } from 'react-icons/fi';
import { getAdminStats } from '../../store/adminSlice';
import Card from '../../components/common/Card/Card';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, verticalPerf, recentBookings, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminStats());
  }, [dispatch]);

  const iconMap = {
    FiDollarSign: <FiDollarSign />,
    FiUsers: <FiUsers />,
    FiCalendar: <FiCalendar />,
    FiCheckCircle: <FiCheckCircle />
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.dashHeader}>
        <div>
          <h1 className={styles.dashTitle}>Analytics Overview</h1>
          <p className={styles.dashSubtitle}>Monitoring multi-vertical performance across the platform.</p>
        </div>
        <div className={styles.dashActions}>
          <button className={styles.exportBtn}>Generate Report</button>
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <Card key={idx} className={styles.statCard}>
            <div className={styles.statInfo}>
              <div className={styles.statHeader}>
                <span className={styles.statIcon} style={{ background: `${stat.color}10`, color: stat.color }}>{iconMap[stat.icon]}</span>
                <span className={styles.statTrend}>{stat.trend}</span>
              </div>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className={styles.dashGrid}>
        <div className={styles.mainCol}>
          <Card className={styles.mainCard}>
            <div className={styles.cardHeader}>
              <h3>Recent Bookings</h3>
              <button className={styles.viewAll}>View All Bookings</button>
            </div>
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Professional</th>
                    <th>Vertical</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, idx) => (
                    <tr key={idx}>
                      <td className={styles.orderId}>{booking.id}</td>
                      <td>{booking.user}</td>
                      <td>{booking.pro}</td>
                      <td>
                        <span className={`${styles.badge} ${styles[booking.vertical.toLowerCase().replace(' ', '')]}`}>
                          {booking.vertical}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.status} ${styles[booking.status.toLowerCase()]}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>{booking.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className={styles.sideCol}>
          <Card className={styles.secondaryCard}>
            <div className={styles.cardHeader}>
              <h3>Vertical Performance</h3>
            </div>
            <div className={styles.perfList}>
              {verticalPerf.map((vp, idx) => (
                <div key={idx} className={styles.perfItem}>
                  <div className={styles.perfInfo}>
                    <p>{vp.name}</p>
                    <span>{vp.orders} bookings this month</span>
                  </div>
                  <div className={styles.perfTrend} style={{ color: vp.color }}>{vp.growth}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.secondaryCard} style={{ marginTop: '24px' }}>
            <div className={styles.cardHeader}>
              <h3>Platform Activity</h3>
            </div>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div className={styles.activityDot} style={{ background: '#fbbf24' }}></div>
                <div className={styles.activityInfo}>
                  <p><strong>New Pro Registration</strong></p>
                  <span>Healthcare / Dr. Sarah Jenkins</span>
                  <small>2 minutes ago</small>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityDot} style={{ background: '#10b981' }}></div>
                <div className={styles.activityInfo}>
                  <p><strong>Withdrawal Requested</strong></p>
                  <span>Emily Rose / ₹1,24,000.00</span>
                  <small>45 minutes ago</small>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;