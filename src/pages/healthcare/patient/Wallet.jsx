import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiDollarSign, FiCreditCard, FiArrowUpRight, FiArrowDownRight, FiClock, FiShield, FiTrendingUp } from 'react-icons/fi';
import Card from '../../../components/common/Card/Card';
import { getTransactions } from '../../../store/transactionSlice';
import styles from './Wallet.module.css';

const UserWallet = () => {
    const dispatch = useDispatch();
    const { transactions: txnList, isLoading, isError, message } = useSelector(state => state.transactions);

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    const transactions = txnList || [];

    return (
        <div className={styles.dashboard}>
            <header className={styles.dashHeader}>
                <div>
                    <h1 className={styles.dashTitle}>My Wallet & Payments</h1>
                    <p className={styles.dashSubtitle}>Manage your balances, payment methods, and transaction history.</p>
                </div>
                <div className={styles.dashActions}>
                    <button className={styles.exportBtn}><FiCreditCard /> Add Funds</button>
                </div>
            </header>

            <div className={styles.walletGrid}>
                <div className={styles.leftCol}>
                    <Card className={styles.balanceCard}>
                        <div style={{ zIndex: 1 }}>
                            <div className={styles.balanceLabel}>Available Balance</div>
                            <div className={styles.balanceAmount}>
                                ₹2,850 <span className={styles.trendTag}><FiTrendingUp /> +12%</span>
                            </div>
                        </div>
                        <div className={styles.balanceActions}>
                            <button className={styles.btnDeposit}>Deposit</button>
                            <button className={styles.btnWithdraw}>Withdraw</button>
                        </div>
                    </Card>

                    <Card className={styles.methodsCard}>
                        <h3 className={styles.methodsHeader}>
                            Saved Methods <button className={styles.btnAddMethod}>+ Add New</button>
                        </h3>
                        <div className={styles.methodList}>
                            <div className={styles.methodItem}>
                                <div className={styles.methodInfo}>
                                    <div className={styles.iconVisa}>VISA</div>
                                    <div className={styles.methodDetails}>
                                        <div className={styles.methodNum}>**** **** **** 4242</div>
                                        <div className={styles.methodExp}>Expires 12/26</div>
                                    </div>
                                </div>
                                <span className={styles.badgePrimary}>Primary</span>
                            </div>
                            <div className={styles.methodItem}>
                                <div className={styles.methodInfo}>
                                    <div className={styles.iconUpi}>UPI</div>
                                    <div className={styles.methodDetails}>
                                        <div className={styles.methodNum}>user@paytm</div>
                                        <div className={styles.methodExp}>Verified</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className={styles.historyCard}>
                    <div className={styles.historyHeader}>
                        <h3>Transaction History</h3>
                        <button className={styles.btnViewAll}><FiClock /> View All</button>
                    </div>
                    <div className={styles.tableResponsive}>
                        <table className={styles.tableContainer}>
                            <thead>
                                <tr>
                                    <th>Transaction Details</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((txn) => (
                                    <tr key={txn.id || txn._id}>
                                        <td>
                                            <div className={styles.txnTypeWrapper}>
                                                <div className={`${styles.txnIcon} ${txn.type === 'Deposit' ? styles.iconDeposit : txn.type === 'Refund' ? styles.iconRefund : styles.iconWithdraw}`}>
                                                    {txn.type === 'Deposit' || txn.type === 'Refund' ? <FiArrowDownRight /> : <FiArrowUpRight />}
                                                </div>
                                                <div className={styles.txnDesc}>
                                                    <div className={styles.txnTitle}>{txn.type} via {txn.method}</div>
                                                    {txn.description && <div className={styles.txnSub}>{txn.description}</div>}
                                                    <div className={styles.txnId}>ID: {txn.id || txn._id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={txn.type === 'Deposit' || txn.type === 'Refund' ? styles.amtPositive : styles.amtNegative}>
                                            {txn.type === 'Deposit' || txn.type === 'Refund' ? '+' : '-'}{txn.amount}
                                        </td>
                                        <td>
                                            <span className={txn.status === 'Completed' ? styles.statusCompleted : styles.statusPending}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className={styles.dateText}>{new Date(txn.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UserWallet;
