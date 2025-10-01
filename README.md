# 🎯 Brevo Loyalty Program ROI Simulator

A comprehensive web application to estimate the return on investment (ROI) of loyalty programs. Built with React, TypeScript, and Tailwind CSS, this tool provides detailed financial projections, risk analysis, and professional PDF reports.

![Brevo Logo](src/assets/brevo-logo-full.svg)

## ✨ Features

### 📊 Interactive ROI Calculations
- Real-time calculations with dynamic parameter adjustments
- 3-year projections with detailed yearly breakdowns
- Automatic CA consistency validation and parameter suggestions
- Smart budget allocation between rewards and marketing

### 📈 Comprehensive Analysis
- **Financial Projections**: Detailed revenue, cost, and profit analysis
- **Risk Assessment**: Success probability calculator based on budget and allocation
- **Industry Benchmarks**: Key statistics from loyalty program research
- **Visual Budget Breakdown**: Interactive Chart.js doughnut chart

### 📄 Professional PDF Export
- Clean, structured PDF reports without input controls
- Executive summary with key metrics
- Detailed yearly projections table
- Budget breakdown visualization
- Personalized recommendations based on configuration
- Brevo branding and professional formatting

### 🎨 User Experience
- Responsive design optimized for all screen sizes
- Side-by-side layout (320px sidebar + main content area)
- Real-time parameter validation with helpful alerts
- Comprehensive methodology and sources documentation
- Clean Brevo brand colors (#006A43, #00B88D)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/loyalty-program-roi-simulator.git
cd loyalty-program-roi-simulator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 3.4.18
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Charts**: Chart.js 4.5.0 + react-chartjs-2 5.3.0
- **PDF Export**: html2pdf.js 0.12.1
- **Icons**: Lucide React 0.544.0

## 📁 Project Structure

```
loyalty-program-roi-simulator/
├── src/
│   ├── components/
│   │   ├── loyalty-simulator/
│   │   │   ├── simulation-logic.ts    # Core calculation engine
│   │   │   └── types.ts                # TypeScript interfaces
│   │   └── ui/                         # shadcn/ui components
│   ├── assets/
│   │   ├── brevo-logo.svg              # Favicon
│   │   └── brevo-logo-full.svg         # Header logo
│   ├── lib/
│   │   └── utils.ts                    # Utility functions
│   ├── App.tsx                         # Main application component
│   ├── main.tsx                        # Application entry point
│   └── index.css                       # Global styles
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── vite.config.ts
```

## 🧮 Calculation Methodology

The simulator uses industry-proven formulas and benchmarks:

### 1. **Adoption Rate Calculation**
```
Base Adoption = 15%
Marketing Impact = (1 - Rewards Allocation) × 10%
Budget Impact = Budget % × 1.5%
Year Multiplier = [0.8, 1.0, 1.1] for years 1-3
```

### 2. **Basket Size Impact**
```
Impact = (10% + Rewards Weight × 13%) × Budget Multiplier × Year Multiplier
Budget Multiplier = min(1.5, Budget % / 4)
```

### 3. **Purchase Frequency Impact**
```
Impact = (8% + Rewards Weight × 16%) × Budget Multiplier × Year Multiplier
```

### 4. **Success Probability**
- Base: 63%
- Budget modifiers: Low budget (<2%) -10%, Optimal (2-4%) +12%, High (4-6%) +15%
- Rewards allocation bonus: 50-70% allocation +10%
- Capped at 95%, minimum 40%

### 5. **CAPEX Calculation**
```
Base CAPEX = $20,000
Additional per $10M revenue = $10,000
```

### 6. **Risk Assessment**
- Low Risk: Budget ≤ 3% of revenue
- Medium Risk: Budget 3-6% of revenue
- High Risk: Budget > 6% of revenue

## 📚 Data Sources

1. **LoyaltyLion** - Loyalty program industry statistics and benchmarks
2. **McKinsey & Company** - Customer retention and CLV studies
3. **Boston Consulting Group (BCG)** - Loyalty economics research
4. **OpenLoyalty** - Loyalty program implementation costs

## 🎯 Key Assumptions

- 3% annual inflation rate
- Operational costs = 10% of program budget
- Retention rates: Year 1: 35%, Year 2: 42.5%, Year 3: 50%
- Linear monthly profit distribution for payback calculation
- Independent impacts of basket size and purchase frequency

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💼 About Brevo

Brevo is a leading customer relationship management platform that helps businesses grow through email marketing, SMS, chat, CRM, and marketing automation.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
