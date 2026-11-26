-- MariaDB Referential Integrity Seed Script (matches submission § 5.1 / § 5.2)
-- Usage: mariadb -u root -p < server/db/seeds.sql
USE algopulse_db;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE backtest_results;
TRUNCATE TABLE orders;
TRUNCATE TABLE strategies;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (user_id, email, password_hash, virtual_balance, created_at) VALUES
(1, 'alex.chen@example.com',     '$2b$10$e8KzGvX9qW1mU7yL6z.O.eOQ2kL4vF8rS2wN9tP1qR5uX3yZ7aB6c', 10000.00, '2026-01-15 08:30:00'),
(2, 'sarah.jenkins@example.com', '$2b$10$k9LzHvY8rX2nV8zM7a.P.fPR3lM5wG9tT3xO0uQ2rS6vY4zAaC7d', 25000.00, '2026-03-20 14:15:00');

INSERT INTO strategies (strategy_id, user_id, strategy_name, asset_symbol, sma_period, rsi_threshold, stop_loss_pct, take_profit_pct, status, created_at) VALUES
(101, 1, 'BTC MA Crossover', 'BTC/USDT', 20, 30, 2.50, 5.00, 'ACTIVE', '2026-02-01 10:00:00'),
(102, 1, 'ETH Breakout',     'ETH/USDT', 50, 40, 1.50, 4.00, 'PAUSED', '2026-02-10 11:45:00'),
(103, 1, 'SOL Trend',        'SOL/USDT', 30, 35, 3.00, 8.00, 'ACTIVE', '2026-03-05 09:20:00');

INSERT INTO orders (order_id, strategy_id, order_type, price, quantity, pnl_amount, order_status, executed_at) VALUES
(979, 101, 'SELL', 95400.0000, 0.050000,   0.00, 'CANCELLED', '2026-11-18 10:05:00'),
(980, 103, 'BUY',    228.5000, 5.000000,   0.00, 'FILLED',    '2026-11-19 16:40:00'),
(982, 101, 'BUY',  96100.0000, 0.050000,   0.00, 'FILLED',    '2026-11-20 14:32:10'),
(983, 101, 'SELL', 98500.0000, 0.050000, 120.00, 'FILLED',    '2026-11-22 09:15:45'),
(984, 102, 'SELL',  3620.0000, 1.200000,  45.50, 'FILLED',    '2026-11-24 18:20:00');

INSERT INTO backtest_results (strategy_id, start_date, end_date, initial_capital, total_return_pct, win_rate_pct, max_drawdown_pct, trades_json) VALUES
(101, '2026-01-01', '2026-11-26', 10000.00, 18.40, 64.20, -4.10,
 '[{"date":"2026-11-20","type":"BUY","price":92100,"amount":0.1,"pnl":null,"status":"EXECUTED"},{"date":"2026-11-22","type":"SELL","price":95800,"amount":0.1,"pnl":370.00,"status":"PROFIT"}]');
