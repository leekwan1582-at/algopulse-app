-- MariaDB DDL Schema for AlgoPulse
-- Usage: mariadb -u root -p < server/db/schema.sql
CREATE DATABASE IF NOT EXISTS algopulse_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE algopulse_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id         INT AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    virtual_balance DECIMAL(15, 2) NOT NULL DEFAULT 10000.00,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Strategy Configurations Table
CREATE TABLE IF NOT EXISTS strategies (
    strategy_id     INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    strategy_name   VARCHAR(100) NOT NULL,
    asset_symbol    VARCHAR(20) NOT NULL,
    sma_period      INT NOT NULL DEFAULT 20,
    rsi_threshold   INT NOT NULL DEFAULT 30,
    stop_loss_pct   DECIMAL(5, 2) NOT NULL,
    take_profit_pct DECIMAL(5, 2) NOT NULL,
    status          ENUM('ACTIVE', 'PAUSED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_strategy_name CHECK (CHAR_LENGTH(strategy_name) >= 3),
    CONSTRAINT chk_sma_period    CHECK (sma_period BETWEEN 1 AND 500),
    CONSTRAINT chk_rsi_threshold CHECK (rsi_threshold BETWEEN 1 AND 100),
    CONSTRAINT chk_stop_loss     CHECK (stop_loss_pct BETWEEN 0.10 AND 50.00),
    CONSTRAINT chk_take_profit   CHECK (take_profit_pct BETWEEN 0.50 AND 200.00),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_strategies_user_status (user_id, status)
) ENGINE=InnoDB;

-- Order History & Trade Logs Table
CREATE TABLE IF NOT EXISTS orders (
    order_id     INT AUTO_INCREMENT PRIMARY KEY,
    strategy_id  INT NOT NULL,
    order_type   ENUM('BUY', 'SELL') NOT NULL,
    price        DECIMAL(15, 4) NOT NULL,
    quantity     DECIMAL(15, 6) NOT NULL,
    pnl_amount   DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    order_status ENUM('FILLED', 'CANCELLED', 'EXECUTED') NOT NULL DEFAULT 'FILLED',
    executed_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_price    CHECK (price > 0),
    CONSTRAINT chk_quantity CHECK (quantity > 0),
    FOREIGN KEY (strategy_id) REFERENCES strategies(strategy_id) ON DELETE CASCADE,
    INDEX idx_orders_strategy (strategy_id),
    INDEX idx_orders_status_time (order_status, executed_at)
) ENGINE=InnoDB;

-- Backtest Results Table (Backtest Studio, Wireframe 3)
CREATE TABLE IF NOT EXISTS backtest_results (
    backtest_id      INT AUTO_INCREMENT PRIMARY KEY,
    strategy_id      INT NOT NULL,
    start_date       DATE NOT NULL,
    end_date         DATE NOT NULL,
    initial_capital  DECIMAL(15, 2) NOT NULL,
    total_return_pct DECIMAL(7, 2) NOT NULL,
    win_rate_pct     DECIMAL(5, 2) NOT NULL,
    max_drawdown_pct DECIMAL(7, 2) NOT NULL,
    trades_json      JSON NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_backtest_dates CHECK (end_date >= start_date),
    FOREIGN KEY (strategy_id) REFERENCES strategies(strategy_id) ON DELETE CASCADE,
    INDEX idx_backtest_strategy (strategy_id)
) ENGINE=InnoDB;
