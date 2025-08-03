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
    section: 'Beverages',
    items: [
      { id: 1, name: 'Coke', calories: 139, protein: 0, carbs: 35, fats: 0, sugar: 65 },
      { id: 2, name: 'Pepsi', calories: 65, protein: 0, carbs: 65, fats: 0, sugar: 65 },
      { id: 3, name: 'Amul Chach', calories: 29, protein: 1.7, carbs: 2.3, fats: 1.5, sugar: 8 },
      { id: 4, name: 'Amul Lassi', calories: 79, protein: 2.3, carbs: 12.8, fats: 2.1, sugar: 12 },
      { id: 5, name: 'Amul Kool', calories: 89, protein: 3.2, carbs: 12, fats: 3.1, sugar: 12 },
    ],
  },
  {
    section: 'Packet Items - Chips',
    items: [
      { id: 6, name: 'Kurkure', calories: 556, protein: 6.4, carbs: 56.8, fats: 33.7, sugar: 1.7 },
      { id: 7, name: 'Uncle Chips', calories: 536, protein: 6.4, carbs: 54.6, fats: 32.4, sugar: 2.2 },
      { id: 8, name: 'Lays', calories: 553, protein: 6.7, carbs: 52.6, fats: 35.1, sugar: 0 },
      { id: 9, name: 'Bingo Mad Angles', calories: 526, protein: 5.6, carbs: 61.2, fats: 29.5, sugar: 2.9 },
    ],
  },
  {
    section: 'Chocolates',
    items: [
      { id: 10, name: 'Dairy Milk', calories: 531, protein: 7.9, carbs: 60.4, fats: 29.0, sugar: 57 },
      { id: 11, name: 'KitKat', calories: 438, protein: 6.4, carbs: 47.4, fats: 24.8, sugar: 35 },
      { id: 12, name: 'Nutties', calories: 511, protein: 5.0, carbs: 67.2, fats: 24.8, sugar: 61 },
      { id: 13, name: 'Dairy Milk Oreo', calories: 563, protein: 6.0, carbs: 56.9, fats: 34.8, sugar: 48 },
      { id: 14, name: 'Fruit & Nut', calories: 522, protein: 8.5, carbs: 59, fats: 28.6, sugar: 52.3 },
      { id: 15, name: 'Crispello', calories: 522, protein: 5.2, carbs: 64.8, fats: 27.6, sugar: 48.7 },
      { id: 16, name: 'MilkyBar', calories: 524, protein: 11.1, carbs: 50.1, fats: 30, sugar: 40 },
      { id: 17, name: '5 Star 3D', calories: 504, protein: 3.4, carbs: 64.7, fats: 26.9, sugar: 51 },
      { id: 18, name: 'Snickers', calories: 501, protein: 9.9, carbs: 58.3, fats: 26.6, sugar: 47.6 },
      { id: 19, name: 'Amul Dark Chocolate', calories: 531, protein: 6.4, carbs: 57.4, fats: 33.1, sugar: 43 },
    ],
  },
];

export default function Canteen1() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [totals, setTotals] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    sugar: number;
  } | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  const allItems = FOOD_SECTIONS.flatMap((section) => section.items);

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
      0% { background-position: 0% 70%; }
      50% { background-position: 100% 30%; }
      100% { background-position: 0% 70%; }
    }
    .canteen-card {
      background: rgba(255, 255, 255, 0.85);
      border-radius: 2rem;
      box-shadow: 0 6px 36px rgba(110,138,255,0.10), 0 4px 28px rgba(244, 213, 248, 0.08);
      backdrop-filter: blur(24px);
      max-width: 540px;
      width: 100%;
      padding: 3rem 3.5rem;
      margin: 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      transition: opacity 0.6s ease;
      color: #41725f;
      font-family: 'Inter', sans-serif;
    }
    .menu-title {
      font-size: 2.5rem;
      color: #4f59c5;
      margin-bottom: 1rem;
      letter-spacing: 0.03em;
      font-weight: 900;
      font-family: 'Poppins, Inter, Arial, sans-serif';
      text-shadow: 0 3px 12px #d4dbfa33;
    }
    h2.section-header {
      color: #6c63ff;
      margin-bottom: 0.75rem;
      border-bottom: 2px solid #a29bfe;
      padding-bottom: 4px;
      font-weight: 700;
      font-size: 1.25rem;
      text-align: left;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    ul.item-list {
      list-style: none;
      padding: 0;
      margin: 0 0 2rem 0;
      width: 100%;
      max-width: 400px;
      font-size: 1.1rem;
    }
    li.item {
      padding: 0.75rem 1rem;
      margin-bottom: 0.5rem;
      background: #f7fbff;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.24s ease;
      user-select: none;
      font-weight: 700;
      color: #7d8cff;
      border: 2px solid transparent;
    }
    li.item.selected {
      background: linear-gradient(90deg,#dbeafe,#e7fbf6);
      box-shadow: 0 0 8px #909ffe77;
      border: 2px solid #6c63ff44;
      color: #4f59c5;
    }
    li.item:hover {
      filter: brightness(1.05);
    }
    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 6px;
      user-select: none;
    }
    button.qty-btn {
      padding: 0 10px;
      cursor: pointer;
      font-size: 1.3rem;
      border: none;
      background-color: #6c63ff33;
      color: #6c63ff;
      border-radius: 5px;
      line-height: 1;
      user-select: none;
      transition: background-color 0.3s ease;
    }
    button.qty-btn:hover {
      background-color: #807cff88;
    }
    input.quantity-input {
      width: 42px;
      text-align: center;
      font-size: 1rem;
      border-radius: 6px;
      border: 1.5px solid #a3a3a3;
      outline-color: #6c63ff;
      user-select: none;
      transition: border-color 0.3s ease;
    }
    input.quantity-input:focus {
      border-color: #6c63ff;
    }
    .buttons-container {
      display: flex;
      gap: 1.2rem;
      justify-content: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      width: 100%;
      max-width: 400px;
    }
    button.action-btn {
      padding: 0.75rem 2rem;
      font-size: 1.17rem;
      font-weight: 600;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      flex-grow: 1;
      min-width: 150px;
      transition: all 0.21s ease;
      user-select: none;
    }
    button.action-btn:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      box-shadow: none;
    }
    button.calc-btn {
      background: linear-gradient(90deg,#a1c4fd,#c2e9fb);
      color: #304356;
      box-shadow: 0 4px 18px #a1c4fd33;
    }
    button.calc-btn:disabled {
      background: linear-gradient(90deg, #ddd, #eee);
      color: #888;
      box-shadow: none;
    }
    button.clear-btn {
      background: #ffe2ec;
      color: #ba4184;
      box-shadow: 0 4px 14px #ffbbe933;
    }
    .totals-display {
      background: rgba(159,207,250,0.12);
      border-radius: 13px;
      padding: 1rem 1.8rem;
      color: #294d5e;
      font-size: 1.14rem;
      width: 100%;
      max-width: 400px;
      text-align: left;
      box-shadow: 0 1px 7px #c2e9fb30;
      user-select: none;
    }
    .totals-display h2 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-weight: 700;
      font-size: 1.21rem;
      color: #5c5d8d;
    }


    @media (max-width: 700px) {
      .canteen-card {
        max-width: 96vw !important;
        padding: 1.5rem 1rem !important;
      }
      button.qty-btn {
        font-size: 1.1rem;
        padding: 0 6px;
      }
      input.quantity-input {
        width: 36px !important;
        font-size: 0.85rem !important;
      }
      .menu-title {
        font-size: 2.2rem !important;
      }
      .buttons-container {
        gap: 0.9rem !important;
      }
    }
    @media (max-width: 450px) {
      .canteen-card {
        border-radius: 1.2rem !important;
        padding: 1rem 0.4rem !important;
      }
      .menu-title {
        font-size: 1.8rem !important;
      }
      .buttons-container {
        flex-direction: column;
      }
      button.action-btn {
        min-width: 100% !important;
      }
      input.quantity-input {
        width: 30px !important;
        font-size: 0.8rem !important;
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
            'linear-gradient(120deg, #f9fbff 0%, #c9e4f6 30%, #f7dde9 70%, #fff6ea 100%)',
          backgroundSize: '350% 350%',
          animation: 'gradientFlow 20s ease-in-out infinite',
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
            filter: 'blur(50px)',
            opacity: 0.35,
            zIndex: 0,
            top: 50,
            left: 30,
            width: 100,
            height: 100,
            background: '#e3e5fe',
          }}
        />
        <div
          style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(50px)',
            opacity: 0.35,
            zIndex: 0,
            bottom: 60,
            right: 50,
            width: 140,
            height: 140,
            background: '#ffdadb',
          }}
        />

        {/* Content Card */}
        <div className="canteen-card" style={{ opacity: fadeIn ? 1 : 0 }}>
          <h1 className="menu-title">Amul Canteen Menu</h1>

          <p>
            Select items to build your meal:
            <br />
            Specify quantity and calculate total calories and macros!
          </p>

          {/* Category Sections */}
          {FOOD_SECTIONS.map((section) => (
            <div key={section.section} style={{ width: '100%', maxWidth: 400, marginBottom: '1.75rem' }}>
              <h2 className="section-header">{section.section}</h2>
              <ul className="item-list">
                {section.items.map((item) => {
                  const qty = quantities[item.id] || 0;
                  const selected = qty > 0;

                  return (
                    <li
                      key={item.id}
                      className={`${selected ? 'item selected' : 'item'}`}
                      onClick={() => toggleSelection(item.id)}
                    >
                      <div>{item.name}</div>

                      <div className="quantity-controls" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleSelection(item.id)}
                          aria-label={`Select ${item.name}`}
                        />
                        {selected && (
                          <>
                            <button
                              className="qty-btn"
                              type="button"
                              onClick={() => decrementQuantity(item.id)}
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              –
                            </button>
                            <input
                              type="number"
                              className="quantity-input"
                              min={1}
                              value={qty}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val) && val > 0) updateQuantity(item.id, val);
                              }}
                              aria-label={`Quantity for ${item.name}`}
                            />
                            <button
                              className="qty-btn"
                              type="button"
                              onClick={() => incrementQuantity(item.id)}
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
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
              className="action-btn calc-btn"
              onClick={calculateTotals}
              disabled={Object.keys(quantities).length === 0}
              aria-disabled={Object.keys(quantities).length === 0}
              aria-label="Calculate macros for selected items"
              type="button"
            >
              Calculate Macros
            </button>

            <button
              className="action-btn clear-btn"
              onClick={clearSelection}
              disabled={Object.keys(quantities).length === 0 && !totals}
              aria-disabled={Object.keys(quantities).length === 0 && !totals}
              aria-label="Clear selection and totals"
              type="button"
            >
              Clear Selection
            </button>
          </div>

          {totals && (
            <div className="totals-display" aria-live="polite">
              <h2>Total Nutrition</h2>
              <p>
                Calories: <b>{totals.calories.toFixed(0)} kcal</b>
              </p>
              <p>
                Protein: <b>{totals.protein.toFixed(1)} g</b>
              </p>
              <p>
                Carbohydrates: <b>{totals.carbs.toFixed(1)} g</b>
              </p>
              <p>
                Fats: <b>{totals.fats.toFixed(1)} g</b>
              </p>
              <p>
                Sugar: <b>{totals.sugar.toFixed(1)} g</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


