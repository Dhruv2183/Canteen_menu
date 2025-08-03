import { useState, useEffect } from 'react';

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  sugar: number;
}

interface FoodSection {
  section: string;
  items: FoodItem[];
}

const FOOD_SECTIONS: FoodSection[] = [
  {
    section: 'Beverages & Cold Items',
    items: [
      { id: 1, name: 'Pineapple Shake', calories: 210, protein: 4, carbs: 35, fats: 6, sugar: 30 },
      { id: 2, name: 'Cold Coffee', calories: 150, protein: 5, carbs: 20, fats: 4, sugar: 12 },
      { id: 3, name: 'Chuski', calories: 60, protein: 0, carbs: 15, fats: 0, sugar: 14 },
      { id: 4, name: 'Cold Drinks', calories: 140, protein: 0, carbs: 39, fats: 0, sugar: 35 },
      { id: 5, name: 'Shikanji', calories: 50, protein: 0, carbs: 12, fats: 0, sugar: 10 },
    ],
  },
  {
    section: 'Desserts & Snacks',
    items: [
      { id: 6, name: 'Icecream', calories: 200, protein: 3, carbs: 25, fats: 10, sugar: 17 },
      { id: 7, name: 'Chocobar', calories: 250, protein: 4, carbs: 30, fats: 14, sugar: 21 },
      { id: 8, name: 'Cone', calories: 180, protein: 3, carbs: 28, fats: 7, sugar: 17 },
      { id: 9, name: 'Cakes', calories: 300, protein: 5, carbs: 40, fats: 15, sugar: 25 },
    ],
  },
  {
    section: 'Hot Drinks',
    items: [
      { id: 10, name: 'Tea', calories: 30, protein: 1, carbs: 5, fats: 1, sugar: 7 },
      { id: 11, name: 'Hot Coffee', calories: 60, protein: 3, carbs: 8, fats: 2, sugar: 11 },
    ],
  },
];

export default function Canteen2() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [totals, setTotals] = useState<{ calories: number; protein: number; carbs: number; fats: number; sugar: number } | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  const allItems = FOOD_SECTIONS.flatMap(section => section.items);

  useEffect(() => setFadeIn(true), []);

  const isSelected = (id: number) => (quantities[id] ?? 0) > 0;

  const toggleSelection = (id: number) => {
    setQuantities(prev => {
      if (prev[id] && prev[id] > 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: 1 };
    });
  };

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) return;
    setQuantities(prev => ({ ...prev, [id]: qty }));
  };

  const incrementQuantity = (id: number) => {
    const qty = quantities[id] ?? 0;
    updateQuantity(id, qty + 1);
  };

  const decrementQuantity = (id: number) => {
    const qty = quantities[id] ?? 0;
    if (qty > 1) updateQuantity(id, qty - 1);
  };

  const calculateTotals = () => {
    const selectedItems = allItems.filter(item => isSelected(item.id));
    const totals = selectedItems.reduce(
      (acc, item) => {
        const qty = quantities[item.id] ?? 1;
        return {
          calories: acc.calories + item.calories * qty,
          protein: acc.protein + item.protein * qty,
          carbs: acc.carbs + item.carbs * qty,
          fats: acc.fats + item.fats * qty,
          sugar: acc.sugar + item.sugar * qty,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0 }
    );
    setTotals(totals);
  };

  const clearSelection = () => {
    setQuantities({});
    setTotals(null);
  };

  const styleTag = `
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .canteen-card {
      background: rgba(245, 243, 251, 0.92);
      border-radius: 2.5rem;
      box-shadow:
        0 10px 30px rgba(167, 155, 208, 0.15),
        0 4px 20px rgba(196, 183, 222, 0.12);
      backdrop-filter: blur(22px);
      max-width: 560px;
      width: 100%;
      padding: 3.5rem 4rem;
      margin: 1.8rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      transition: opacity 0.6s ease;
      color: #5b4e8a;
      font-family: 'Inter', sans-serif;
    }
    .menu-title {
      font-size: 2.6rem;
      margin-bottom: 1rem;
      font-weight: 900;
      font-family: 'Poppins', 'Inter', Arial, sans-serif;
      text-shadow: 0 3px 8px rgba(91, 78, 138, 0.3);
      letter-spacing: 0.05em;
      color: #5b4e8a;
    }
    h2.section-header {
      color: #7e73b8;
      margin-bottom: 1rem;
      border-bottom: 3px solid #b7aedf;
      padding-bottom: 6px;
      font-weight: 700;
      font-size: 1.3rem;
      text-align: left;
      max-width: 440px;
      margin-left: auto;
      margin-right: auto;
    }
    ul.item-list {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem 0;
      width: 100%;
      max-width: 440px;
      font-size: 1.1rem;
      color: #6e63b3;
    }
    li.item {
      padding: 0.8rem 1rem;
      margin-bottom: 0.5rem;
      background: #f7f5fc;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
      user-select: none;
      font-weight: 700;
      border: 2px solid transparent;
    }
    li.item.selected {
      background: linear-gradient(90deg, #cbc5ef, #d6ccff);
      box-shadow: 0 0 12px rgba(114, 104, 169, 0.55);
      border: 2px solid #796cd1;
      color: #5b4e8a;
    }
    li.item:hover {
      filter: brightness(1.07);
    }
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 6px;
      user-select: none;
    }
    button.qty-btn {
      padding: 0 9px;
      cursor: pointer;
      font-size: 1.2rem;
      border: none;
      background-color: #907ecf99;
      color: #6a56b1;
      border-radius: 6px;
      line-height: 1;
      user-select: none;
      transition: background-color 0.3s ease;
    }
    button.qty-btn:hover {
      background-color: #a892e599;
    }
    input.quantity-input {
      width: 44px;
      text-align: center;
      font-size: 1rem;
      border-radius: 6px;
      border: 1.6px solid #aca0d3;
      outline-color: #7365d6;
      user-select: none;
      transition: border-color 0.3s ease;
      background-color: #f9f8fe;
      color: #5a4f8b;
    }
    input.quantity-input:focus {
      border-color: #7365d6;
      box-shadow: 0 0 6px #aca7e099;
    }
    .buttons-container {
      display: flex;
      gap: 1.3rem;
      justify-content: center;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      width: 100%;
      max-width: 440px;
    }
    button.action-btn {
      padding: 0.75rem 2rem;
      font-size: 1.15rem;
      font-weight: 700;
      border: none;
      border-radius: 11px;
      cursor: pointer;
      flex-grow: 1;
      min-width: 160px;
      transition: all 0.25s ease;
      user-select: none;
      box-shadow: 0 4px 20px transparent;
    }
    button.action-btn:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      box-shadow: none !important;
    }
    button.calc-btn {
      background: linear-gradient(100deg, #9989d9, #beb3f4);
      color: #4d3c90;
      box-shadow: 0 6px 28px #b7adefcc;
    }
    button.calc-btn:disabled {
      background: #c4bbef66;
      color: #7d71bfbb;
      box-shadow: none;
    }
    button.clear-btn {
      background: #e7e1ff;
      color: #6e5ec7;
      box-shadow: 0 6px 18px #c5bcfabe;
    }
    .totals-display {
      background: rgba(189, 182, 244, 0.15);
      border-radius: 14px;
      padding: 1.2rem 2rem;
      color: #4a3f80;
      font-size: 1.15rem;
      width: 100%;
      max-width: 440px;
      text-align: left;
      box-shadow: 0 2px 9px #c2bbea88;
      user-select: none;
    }
    .totals-display h2 {
      margin-top: 0;
      margin-bottom: 1.2rem;
      font-weight: 800;
      font-size: 1.3rem;
      color: #5349a8;
      letter-spacing: 0.03em;
    }

    /* Responsive tweaks */
    @media (max-width: 720px) {
      .canteen-card {
        max-width: 96vw !important;
        padding: 2rem 1.5rem !important;
      }
      button.qty-btn {
        font-size: 1.1rem;
        padding: 0 7px;
      }
      input.quantity-input {
        width: 40px !important;
        font-size: 0.9rem !important;
      }
      .menu-title {
        font-size: 2.3rem !important;
      }
      .buttons-container {
        gap: 1rem !important;
      }
    }
    @media (max-width: 450px) {
      .canteen-card {
        border-radius: 1.6rem !important;
        padding: 1.2rem 0.6rem !important;
      }
      .menu-title {
        font-size: 1.9rem !important;
      }
      .buttons-container {
        flex-direction: column;
      }
      button.action-btn {
        min-width: 100% !important;
      }
      input.quantity-input {
        width: 32px !important;
        font-size: 0.85rem !important;
      }
    }
  `;

  return (
    <>
      <style>{styleTag}</style>

      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          background:
            'linear-gradient(120deg, #f7f5ff 0%, #dbd7f8 40%, #f5e9ff 70%, #efedff 100%)',
          backgroundSize: '300% 300%',
          animation: 'gradientFlow 25s ease-in-out infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', sans-serif",
          boxSizing: 'border-box',
          position: 'relative',
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {/* Decorative Orbs */}
        <div
          style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(55px)',
            opacity: 0.28,
            zIndex: 0,
            top: 45,
            left: 25,
            width: 110,
            height: 110,
            background: '#baa3f0',
          }}
        />
        <div
          style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(55px)',
            opacity: 0.3,
            zIndex: 0,
            bottom: 70,
            right: 55,
            width: 150,
            height: 150,
            background: '#d9bdff',
          }}
        />

        {/* Content Card */}
        <div className="canteen-card" style={{ opacity: fadeIn ? 1 : 0 }}>
          <h1 className="menu-title">Plant J Canteen Menu</h1>

          <p>
            Select items to build your meal:
            <br />
            Specify quantity and calculate total calories and macros!
          </p>

          {FOOD_SECTIONS.map(section => (
            <div key={section.section} style={{ width: '100%', maxWidth: 440, marginBottom: '1.8rem' }}>
              <h2 className="section-header">{section.section}</h2>
              <ul className="item-list">
                {section.items.map(item => {
                  const qty = quantities[item.id] || 0;
                  const selected = qty > 0;

                  return (
                    <li
                      key={item.id}
                      className={selected ? 'item selected' : 'item'}
                      onClick={() => toggleSelection(item.id)}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSelection(item.id); } }}
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      <div>{item.name}</div>

                      <div
                        className="quantity-controls"
                        onClick={e => e.stopPropagation()}
                        role="group"
                        aria-label={`Quantity controls for ${item.name}`}
                        style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <input type="checkbox" checked={selected} onChange={() => toggleSelection(item.id)} aria-label={`Select ${item.name}`} />
                        {selected && (
                          <>
                            <button className="qty-btn" type="button" onClick={() => decrementQuantity(item.id)} aria-label={`Decrease quantity of ${item.name}`}>–</button>
                            <input
                              type="number"
                              className="quantity-input"
                              min={1}
                              value={qty}
                              onChange={e => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val) && val > 0) updateQuantity(item.id, val);
                              }}
                              aria-label={`Quantity for ${item.name}`}
                            />
                            <button className="qty-btn" type="button" onClick={() => incrementQuantity(item.id)} aria-label={`Increase quantity of ${item.name}`}>+</button>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="buttons-container">
            <button
              disabled={Object.keys(quantities).length === 0}
              onClick={calculateTotals}
              aria-disabled={Object.keys(quantities).length === 0}
              aria-label="Calculate macros for selected items"
              className="action-btn calc-btn"
              type="button"
            >
              Calculate Macros
            </button>

            <button
              disabled={Object.keys(quantities).length === 0 && !totals}
              onClick={clearSelection}
              aria-disabled={Object.keys(quantities).length === 0 && !totals}
              aria-label="Clear selection and totals"
              className="action-btn clear-btn"
              type="button"
            >
              Clear Selection
            </button>
          </div>

          {totals && (
            <div className="totals-display" aria-live="polite">
              <h2>Total Nutrition</h2>
              <p>Calories: <b>{totals.calories.toFixed(0)} kcal</b></p>
              <p>Protein: <b>{totals.protein.toFixed(1)} g</b></p>
              <p>Carbohydrates: <b>{totals.carbs.toFixed(1)} g</b></p>
              <p>Fats: <b>{totals.fats.toFixed(1)} g</b></p>
              <p>Sugar: <b>{totals.sugar.toFixed(1)} g</b></p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
