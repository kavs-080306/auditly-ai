import streamlit as st
import random
import time
from datetime import datetime

# --- Day 5: Streamlit Configuration ---
st.set_page_config(page_title="Auditly.ai | AI Stack Optimizer", page_icon="🛡️", layout="centered")

# Custom CSS to match your Auditly branding
st.markdown("""
    <style>
    .main { background-color: #f8fafc; }
    .stButton>button {
        width: 100%;
        border-radius: 12px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }
    .metric-card {
        background-color: #2563eb;
        color: white;
        padding: 2rem;
        border-radius: 2rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    .status-dot {
        height: 8px; width: 8px;
        background-color: #22c55e;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
        box-shadow: 0 0 8px #22c55e;
    }
    </style>
    """, unsafe_allow_html=True)

# --- Pricing Data ---
PRICING_INR = {
    "CHATGPT_PLUS": 1680,
    "CLAUDE_PRO": 1680,
    "CURSOR_PRO": 1680,
    "COPILOT": 840
}

# --- State Management ---
if 'live_count' not in st.session_state:
    st.session_state.live_count = 1240500

# --- Header Section ---
col_h1, col_h2 = st.columns([2, 1])
with col_h1:
    st.markdown("# Auditly<span style='color:#2563eb'>.ai</span>", unsafe_allow_html=True)
    st.caption("AI Stack Optimization for Indian Devs")
with col_h2:
    currency = st.radio("Currency", ["INR", "USD"], horizontal=True)

# Status Bar
st.markdown(f"""
    <div style='display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;'>
        <div style='font-size: 10px; font-weight: 900; color: #94a3b8;'>
            <span class='status-dot'></span>SYSTEM: VERIFIED
        </div>
        <div style='font-size: 10px; font-weight: 900; color: #2563eb;'>
            TOTAL SAVED: ₹{st.session_state.live_count:,}
        </div>
    </div>
    """, unsafe_allow_html=True)

# --- Selection Section ---
st.markdown("### 🛠️ Active Stack")
selected_tools = []
for tool_id, price in PRICING_INR.items():
    display_name = tool_id.replace("_", " ").title()
    display_price = f"₹{price:,}" if currency == "INR" else f"${(price/84):.2f}"
    
    if st.checkbox(f"{display_name} ({display_price})", key=tool_id):
        selected_tools.append(tool_id)

# --- Audit Logic ---
if selected_tools:
    total_spend = sum(PRICING_INR[t] for t in selected_tools)
    savings = 0
    suggestions = []

    # Logic: Identify Redundancies
    if "CHATGPT_PLUS" in selected_tools and "CLAUDE_PRO" in selected_tools:
        savings += 1680
        suggestions.append("⚠️ **Redundant LLMs:** You're paying for both ChatGPT and Claude. Consider choosing one and using the free tier for the other.")
    
    if "CURSOR_PRO" in selected_tools and "COPILOT" in selected_tools:
        savings += 840
        suggestions.append("⚠️ **IDE Overlap:** Cursor Pro includes advanced autocomplete. You likely don't need a separate GitHub Copilot sub.")

    # --- Results UI ---
    st.markdown("---")
    
    # Savings Card
    save_val = f"₹{savings:,}" if currency == "INR" else f"${(savings/84):.2f}"
    yearly_val = f"₹{savings*12:,}" if currency == "INR" else f"${(savings*12/84):.2f}"
    
    st.markdown(f"""
        <div class="metric-card">
            <p style='font-size: 10px; font-weight: 900; letter-spacing: 0.2em; color: #bfdbfe;'>MONTHLY SAVING</p>
            <h1 style='font-size: 4rem; margin: 0;'>{save_val}</h1>
            <p style='font-size: 12px; font-weight: bold;'>Yearly Impact: +{yearly_val}</p>
        </div>
        """, unsafe_allow_html=True)

    # Strategy Section
    st.markdown("### 🛡️ Optimization Strategy")
    if suggestions:
        for s in suggestions:
            st.info(s)
    else:
        st.success("✅ Your stack is lean! No immediate leaks identified.")

    # Share Button
    if st.button("SHARE REPORT TO X"):
        text = f"I just identified {save_val} in AI leaks with Auditly.ai! 🛡️"
        st.write(f"Link generated: [Click to Tweet](https://twitter.com/intent/tweet?text={text.replace(' ', '%20')})")

else:
    st.markdown("---")
    st.info("📉 **Engine Standby:** Select your tools above to generate a savings roadmap.")

# Footer
st.markdown("---")
st.markdown(f"<p style='text-align: center; font-size: 10px; color: #cbd5e1; font-weight: 900;'>FINAL SUBMISSION • {datetime.now().strftime('%B %Y')}</p>", unsafe_allow_html=True)
