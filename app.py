import streamlit as st
import random
from datetime import datetime

# --- Day 5: Streamlit Configuration ---
st.set_page_config(page_title="Auditly.ai | AI Stack Optimizer", page_icon="🛡️", layout="centered")

# Custom CSS to match your Auditly branding
st.markdown("""
    <style>
    .main { background-color: #f8fafc; }
    [data-testid="stMetricValue"] { font-size: 1.8rem; font-weight: 900; color: #1e293b; }
    .stButton>button {
        width: 100%;
        border-radius: 12px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        background-color: #2563eb;
        color: white;
    }
    .metric-card {
        background-color: #2563eb;
        color: white;
        padding: 2rem;
        border-radius: 2rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin-bottom: 20px;
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
    <div style='display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;'>
        <div style='font-size: 10px; font-weight: 900; color: #94a3b8;'>
            <span class='status-dot'></span>SYSTEM: VERIFIED & LIVE
        </div>
        <div style='font-size: 10px; font-weight: 900; color: #2563eb;'>
            GLOBAL SAVINGS: ₹{st.session_state.live_count:,}
        </div>
    </div>
    """, unsafe_allow_html=True)

# --- Selection Section ---
st.markdown("### 🛠️ Active Stack")
selected_tools = []
cols = st.columns(2)

# Display checkboxes in a grid for better UI
for i, (tool_id, price) in enumerate(PRICING_INR.items()):
    display_name = tool_id.replace("_", " ").title()
    display_price = f"₹{price:,}" if currency == "INR" else f"${(price/84):.2f}"
    
    with cols[i % 2]:
        if st.checkbox(f"{display_name} ({display_price})", key=tool_id):
            selected_tools.append(tool_id)

# --- Audit & Spend Logic ---
if selected_tools:
    current_monthly = sum(PRICING_INR[t] for t in selected_tools)
    savings = 0
    suggestions = []

    # 1. Immediate Feedback: Current Spend Metrics
    st.markdown("---")
    m_col1, m_col2 = st.columns(2)
    with m_col1:
        spend_label = f"₹{current_monthly:,}" if currency == "INR" else f"${(current_monthly/84):.2f}"
        st.metric("Total Monthly Cost", spend_label)
    with m_col2:
        st.metric("Active Subscriptions", len(selected_tools))

    # 2. Logic: Identify Redundancies
    if "CHATGPT_PLUS" in selected_tools and "CLAUDE_PRO" in selected_tools:
        savings += 1680
        suggestions.append("⚠️ **Redundant LLMs:** ChatGPT Plus & Claude Pro overlap. Keep one to save **₹1,680**.")
    
    if "CURSOR_PRO" in selected_tools and "COPILOT" in selected_tools:
        savings += 840
        suggestions.append("⚠️ **IDE Overlap:** Cursor Pro includes native autocomplete. You likely don't need GitHub Copilot.")

    # --- Results UI ---
    save_val = f"₹{savings:,}" if currency == "INR" else f"${(savings/84):.2f}"
    yearly_val = f"₹{savings*12:,}" if currency == "INR" else f"${(savings*12/84):.2f}"
    
    st.markdown(f"""
        <div class="metric-card">
            <p style='font-size: 10px; font-weight: 900; letter-spacing: 0.2em; color: #bfdbfe; margin-bottom: 10px;'>POTENTIAL SAVINGS RECOVERED</p>
            <h1 style='font-size: 4rem; margin: 0; font-weight: 900;'>{save_val}</h1>
            <p style='font-size: 14px; font-weight: bold; opacity: 0.9;'>Yearly Impact: +{yearly_val}</p>
        </div>
        """, unsafe_allow_html=True)

    # Strategy Section
    with st.expander("🛡️ View Optimization Strategy", expanded=True):
        if suggestions:
            for s in suggestions:
                st.warning(s)
        else:
            st.success("✅ No redundancies found. Your stack is highly efficient!")

    # Share Button
    if st.button("SHARE AUDIT REPORT"):
        text = f"I just identified {save_val} in AI subscription leaks with Auditly.ai! 🛡️"
        st.info(f"Report ready! [Post to Twitter/X](https://twitter.com/intent/tweet?text={text.replace(' ', '%20')})")

else:
    st.markdown("---")
    st.info("📉 **Engine Standby:** Select at least one tool to begin the audit.")

# Footer
st.markdown("<br><br>", unsafe_allow_html=True)
st.markdown(f"""
    <div style='text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px;'>
        <p style='font-size: 10px; color: #94a3b8; font-weight: 900; letter-spacing: 0.3em;'>
            FINAL SUBMISSION • CS UNDERGRAD • {datetime.now().strftime('%B %Y').upper()}
        </p>
    </div>
    """, unsafe_allow_html=True)
