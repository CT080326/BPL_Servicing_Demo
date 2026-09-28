/* @ds-bundle: {"format":4,"namespace":"PhoenixBurstDesignSystem_ed31e6","components":[],"sourceHashes":{"ui_kits/burst/app.jsx":"0e232dcb7da2","ui_kits/burst/components.jsx":"113cc00adf5d","ui_kits/burst/components.standalone.jsx":"b064881dc43d","ui_kits/burst/screens.jsx":"90e3427681db","ui_kits/burst/screens.standalone.jsx":"0a85c491bd8c","ui_kits/burst_shadcn/shadcn.jsx":"6deb7577a17d","ui_kits/burst_shadcn/showcase.jsx":"eef7d3586871","ui_kits/burst_shadcn/showcase.standalone.jsx":"d7dec5b80f43"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PhoenixBurstDesignSystem_ed31e6 = window.PhoenixBurstDesignSystem_ed31e6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/burst/app.jsx
try { (() => {
/* global React, ReactDOM, LeftNav, Login, Home, CuratedArtifacts, ArtifactDetail */

function App() {
  const [authed, setAuthed] = React.useState(true);
  const [route, setRoute] = React.useState('home');
  const [chats, setChats] = React.useState([]);
  if (!authed) return /*#__PURE__*/React.createElement(Login, {
    onLogin: () => setAuthed(true)
  });
  const onNavigate = key => setRoute(key === 'home' ? 'home' : key);
  const onNewChat = msg => {
    setChats(c => [msg.slice(0, 40), ...c].slice(0, 8));
    setRoute('artifact');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement(LeftNav, {
    current: route === 'artifact' ? 'artifacts' : route,
    onNavigate: onNavigate,
    chats: chats
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, route === 'home' && /*#__PURE__*/React.createElement(Home, {
    onOpenArtifact: () => setRoute('artifact'),
    onNewChat: onNewChat
  }), route === 'artifacts' && /*#__PURE__*/React.createElement(CuratedArtifacts, {
    onOpenArtifact: () => setRoute('artifact')
  }), route === 'artifact' && /*#__PURE__*/React.createElement(ArtifactDetail, null), route === 'procedures' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      color: 'var(--muted-dark)'
    }
  }, "Procedure Library \u2014 not implemented in kit"), route === 'sources' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      color: 'var(--muted-dark)'
    }
  }, "Regulatory Sources \u2014 not implemented in kit")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/burst/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/burst/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */

// ---------- Logo ----------
const Logo = ({
  size = 40
}) => /*#__PURE__*/React.createElement("img", {
  src: "../../assets/logo.png",
  width: size,
  height: size,
  alt: "Phoenix Burst",
  style: {
    display: 'block'
  }
});
const LogoWithText = ({
  height = 28,
  alt = false
}) => /*#__PURE__*/React.createElement("img", {
  src: alt ? '../../assets/logo-and-text-alt.png' : '../../assets/logo-and-text.png',
  style: {
    height,
    display: 'block'
  },
  alt: "Phoenix Burst"
});

// ---------- Icon (Phosphor via CDN class names) ----------
const Icon = ({
  name,
  size = 22,
  color
}) => /*#__PURE__*/React.createElement("i", {
  className: `ph ph-${name}`,
  style: {
    fontSize: size,
    color,
    lineHeight: 1
  }
});

// ---------- Button ----------
const btnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '8px 18px',
  borderRadius: 9999,
  border: 0,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: '0.02em',
  fontFamily: 'var(--font-sans)',
  transition: 'background-color 150ms, color 150ms'
};
const btnVariants = {
  primary: {
    background: 'var(--primary)',
    color: '#fff'
  },
  secondary: {
    background: 'var(--tertiary)',
    color: '#fff'
  },
  tertiary: {
    background: 'var(--secondary)',
    color: '#fff'
  },
  gradient: {
    background: 'linear-gradient(to top left,var(--primary),var(--secondary))',
    color: '#fff'
  },
  'primary-outline': {
    background: '#fff',
    color: 'var(--primary)',
    border: '2px solid var(--primary)'
  },
  'tertiary-outline': {
    background: '#fff',
    color: 'var(--tertiary)',
    border: '2px solid var(--tertiary)'
  },
  'destructive': {
    background: 'var(--destructive)',
    color: '#fff'
  },
  'destructive-outline': {
    background: '#fff',
    color: 'var(--destructive)',
    border: '2px solid var(--destructive)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--tertiary)'
  },
  link: {
    background: 'transparent',
    color: 'var(--primary)',
    textDecoration: 'underline',
    textUnderlineOffset: 4
  }
};
const Button = ({
  variant = 'primary',
  size,
  fullWidth,
  style,
  children,
  ...rest
}) => {
  const sizeStyle = size === 'sm' ? {
    padding: '4px 10px',
    fontSize: 12
  } : null;
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    style: {
      ...btnBase,
      ...btnVariants[variant],
      ...sizeStyle,
      ...(fullWidth ? {
        width: '100%'
      } : null),
      ...style
    }
  }), children);
};

// ---------- Badge ----------
const badgeVariants = {
  default: {
    background: 'var(--muted)',
    color: '#fff'
  },
  'muted-light': {
    background: 'var(--muted-light)',
    color: 'var(--muted-darkest)'
  },
  'muted-dark': {
    background: 'var(--muted-dark)',
    color: '#fff'
  },
  secondary: {
    background: 'var(--secondary)',
    color: '#fff'
  },
  tertiary: {
    background: 'var(--tertiary)',
    color: '#fff'
  },
  destructive: {
    background: 'var(--destructive)',
    color: '#fff'
  },
  success: {
    background: 'var(--success)',
    color: '#fff'
  },
  requirement: {
    background: 'var(--requirement)',
    color: '#fff'
  },
  story: {
    background: 'var(--story)',
    color: '#fff'
  },
  'acceptance-criteria': {
    background: 'var(--acceptance-criteria)',
    color: '#fff'
  },
  test: {
    background: 'var(--test)',
    color: '#fff'
  },
  link: {
    background: 'var(--primary-light)',
    color: 'var(--link-foreground)'
  },
  burst: {
    background: 'linear-gradient(to top left,var(--primary),var(--secondary))',
    color: '#fff'
  },
  white: {
    background: '#fff',
    color: 'var(--tertiary)',
    border: '1px solid var(--muted-dark)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--tertiary)',
    border: '1px solid var(--nav-border)'
  }
};
const Badge = ({
  variant = 'default',
  rounded,
  children,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 10px',
    borderRadius: rounded ? 9999 : 4,
    fontSize: 14,
    fontWeight: 100,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    ...badgeVariants[variant],
    ...style
  }
}, children);

// ---------- Card ----------
const Card = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    color: 'var(--card-foreground)',
    ...style
  }
}, children);
const CardTitle = ({
  children
}) => /*#__PURE__*/React.createElement("h3", {
  style: {
    margin: 0,
    padding: '8px 16px',
    background: '#EEE',
    borderBottom: '1px solid var(--primary-dark)',
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--tertiary)'
  }
}, children);
const CardContent = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '14px 16px',
    color: 'var(--tertiary)',
    ...style
  }
}, children);

// ---------- Input ----------
const Input = ({
  label,
  error,
  ...rest
}) => /*#__PURE__*/React.createElement("label", {
  style: {
    display: 'block'
  }
}, label && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--tertiary)',
    marginBottom: 4
  }
}, label), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
  style: {
    display: 'flex',
    height: 36,
    width: '100%',
    borderRadius: 6,
    border: `1px solid ${error ? 'var(--destructive)' : 'var(--input)'}`,
    background: '#fff',
    padding: '0 12px',
    fontSize: 14,
    boxShadow: '0 1px 2px rgba(0,0,0,.04)',
    color: 'var(--tertiary)',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    boxSizing: 'border-box'
  }
})), error && /*#__PURE__*/React.createElement("div", {
  style: {
    color: 'var(--destructive)',
    fontSize: 12,
    marginTop: 4
  }
}, error));

// ---------- PageHeader ----------
const PageHeader = ({
  title,
  menu,
  rightContent,
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderTop: 0,
    borderRadius: '0 0 12px 12px',
    padding: '12px 8px 12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 4
  }
}, /*#__PURE__*/React.createElement("h3", {
  style: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    color: 'var(--tertiary)'
  }
}, title), menu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
  style: {
    alignSelf: 'stretch',
    borderRight: '1px solid var(--tertiary)'
  }
}), menu)), children && /*#__PURE__*/React.createElement("div", {
  style: {
    paddingTop: 4,
    color: 'var(--tertiary)',
    fontSize: 14
  }
}, children)), /*#__PURE__*/React.createElement("div", null, rightContent));

// ---------- NavRow / LeftNav ----------
const NavRow = ({
  icon,
  label,
  active,
  collapsed,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: collapsed ? '12px 0' : '10px 16px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    fontSize: 14,
    color: 'var(--tertiary)',
    cursor: 'pointer',
    background: active ? '#fff' : 'transparent',
    fontWeight: active ? 600 : 400,
    borderLeft: active && !collapsed ? '3px solid var(--primary)' : '3px solid transparent',
    paddingLeft: collapsed ? 0 : 13
  },
  onMouseEnter: e => {
    if (!active) e.currentTarget.style.background = 'var(--card-hover)';
  },
  onMouseLeave: e => {
    if (!active) e.currentTarget.style.background = 'transparent';
  }
}, icon, !collapsed && /*#__PURE__*/React.createElement("span", null, label));
const Divider = () => /*#__PURE__*/React.createElement("div", {
  style: {
    borderBottom: '1px solid var(--nav-border)',
    margin: '4px 0'
  }
});
const LeftNav = ({
  current,
  onNavigate,
  chats = []
}) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const items = [{
    key: 'home',
    label: 'Home',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "house-simple"
    })
  }, {
    key: 'artifacts',
    label: 'Curated Artifacts',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "compass-rose"
    })
  }, {
    key: 'procedures',
    label: 'Procedure Library',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "stack"
    })
  }, {
    key: 'sources',
    label: 'Regulatory Sources',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "bank"
    })
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: collapsed ? 64 : 240,
      borderRight: '1px solid var(--nav-border)',
      background: 'var(--muted-lightest)',
      transition: 'width 150ms ease',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'space-between',
      padding: collapsed ? '12px 0' : '12px 12px 12px 16px',
      height: 56,
      boxSizing: 'border-box'
    }
  }, collapsed ? /*#__PURE__*/React.createElement("div", {
    onClick: () => setCollapsed(false),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 32
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LogoWithText, {
    height: 24,
    alt: true
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCollapsed(true),
    style: {
      background: 'transparent',
      border: 0,
      padding: 6,
      borderRadius: 6,
      cursor: 'pointer',
      color: 'gray'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sidebar-simple",
    size: 20,
    color: "gray"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavRow, {
    icon: items[0].icon,
    label: items[0].label,
    active: current === 'home',
    collapsed: collapsed,
    onClick: () => onNavigate('home')
  }), /*#__PURE__*/React.createElement(Divider, null), items.slice(1).map(it => /*#__PURE__*/React.createElement(NavRow, {
    key: it.key,
    icon: it.icon,
    label: it.label,
    active: current === it.key,
    collapsed: collapsed,
    onClick: () => onNavigate(it.key)
  })), /*#__PURE__*/React.createElement(Divider, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px 4px',
      color: 'var(--muted)',
      fontSize: 14
    }
  }, "Burst Chats"), chats.length === 0 ? !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px',
      color: 'var(--muted)',
      fontSize: 14,
      textAlign: 'center'
    }
  }, "No chats yet") : chats.map((c, i) => /*#__PURE__*/React.createElement(NavRow, {
    key: i,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "chat-circle",
      size: 18
    }),
    label: c,
    collapsed: collapsed
  }))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(NavRow, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "user-circle"
    }),
    label: "A. Morales",
    collapsed: collapsed
  }));
};

// ---------- Avatar ----------
const Avatar = ({
  size = 36
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: size,
    height: size,
    borderRadius: 9999,
    flex: 'none',
    background: `url('../../assets/chat-avatar.png') center/cover, linear-gradient(to top left,var(--primary),var(--secondary))`
  }
});
Object.assign(window, {
  Logo,
  LogoWithText,
  Icon,
  Button,
  Badge,
  Card,
  CardTitle,
  CardContent,
  Input,
  PageHeader,
  LeftNav,
  NavRow,
  Divider,
  Avatar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/burst/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/burst/components.standalone.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */

// ---------- Logo ----------
const Logo = ({
  size = 40
}) => /*#__PURE__*/React.createElement("img", {
  src: window.__resources && window.__resources.logo || "../../assets/logo.png",
  width: size,
  height: size,
  alt: "Phoenix Burst",
  style: {
    display: 'block'
  }
});
const LogoWithText = ({
  height = 28,
  alt = false
}) => /*#__PURE__*/React.createElement("img", {
  src: alt ? window.__resources && window.__resources.logoTextAlt || '../../assets/logo-and-text-alt.png' : window.__resources && window.__resources.logoText || '../../assets/logo-and-text.png',
  style: {
    height,
    display: 'block'
  },
  alt: "Phoenix Burst"
});

// ---------- Icon (Phosphor via CDN class names) ----------
const Icon = ({
  name,
  size = 22,
  color
}) => /*#__PURE__*/React.createElement("i", {
  className: `ph ph-${name}`,
  style: {
    fontSize: size,
    color,
    lineHeight: 1
  }
});

// ---------- Button ----------
const btnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '8px 18px',
  borderRadius: 9999,
  border: 0,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: '0.02em',
  fontFamily: 'var(--font-sans)',
  transition: 'background-color 150ms, color 150ms'
};
const btnVariants = {
  primary: {
    background: 'var(--primary)',
    color: '#fff'
  },
  secondary: {
    background: 'var(--tertiary)',
    color: '#fff'
  },
  tertiary: {
    background: 'var(--secondary)',
    color: '#fff'
  },
  gradient: {
    background: 'linear-gradient(to top left,var(--primary),var(--secondary))',
    color: '#fff'
  },
  'primary-outline': {
    background: '#fff',
    color: 'var(--primary)',
    border: '2px solid var(--primary)'
  },
  'tertiary-outline': {
    background: '#fff',
    color: 'var(--tertiary)',
    border: '2px solid var(--tertiary)'
  },
  'destructive': {
    background: 'var(--destructive)',
    color: '#fff'
  },
  'destructive-outline': {
    background: '#fff',
    color: 'var(--destructive)',
    border: '2px solid var(--destructive)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--tertiary)'
  },
  link: {
    background: 'transparent',
    color: 'var(--primary)',
    textDecoration: 'underline',
    textUnderlineOffset: 4
  }
};
const Button = ({
  variant = 'primary',
  size,
  fullWidth,
  style,
  children,
  ...rest
}) => {
  const sizeStyle = size === 'sm' ? {
    padding: '4px 10px',
    fontSize: 12
  } : null;
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    style: {
      ...btnBase,
      ...btnVariants[variant],
      ...sizeStyle,
      ...(fullWidth ? {
        width: '100%'
      } : null),
      ...style
    }
  }), children);
};

// ---------- Badge ----------
const badgeVariants = {
  default: {
    background: 'var(--muted)',
    color: '#fff'
  },
  'muted-light': {
    background: 'var(--muted-light)',
    color: 'var(--muted-darkest)'
  },
  'muted-dark': {
    background: 'var(--muted-dark)',
    color: '#fff'
  },
  secondary: {
    background: 'var(--secondary)',
    color: '#fff'
  },
  tertiary: {
    background: 'var(--tertiary)',
    color: '#fff'
  },
  destructive: {
    background: 'var(--destructive)',
    color: '#fff'
  },
  success: {
    background: 'var(--success)',
    color: '#fff'
  },
  requirement: {
    background: 'var(--requirement)',
    color: '#fff'
  },
  story: {
    background: 'var(--story)',
    color: '#fff'
  },
  'acceptance-criteria': {
    background: 'var(--acceptance-criteria)',
    color: '#fff'
  },
  test: {
    background: 'var(--test)',
    color: '#fff'
  },
  link: {
    background: 'var(--primary-light)',
    color: 'var(--link-foreground)'
  },
  burst: {
    background: 'linear-gradient(to top left,var(--primary),var(--secondary))',
    color: '#fff'
  },
  white: {
    background: '#fff',
    color: 'var(--tertiary)',
    border: '1px solid var(--muted-dark)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--tertiary)',
    border: '1px solid var(--nav-border)'
  }
};
const Badge = ({
  variant = 'default',
  rounded,
  children,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 10px',
    borderRadius: rounded ? 9999 : 4,
    fontSize: 14,
    fontWeight: 100,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    ...badgeVariants[variant],
    ...style
  }
}, children);

// ---------- Card ----------
const Card = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    color: 'var(--card-foreground)',
    ...style
  }
}, children);
const CardTitle = ({
  children
}) => /*#__PURE__*/React.createElement("h3", {
  style: {
    margin: 0,
    padding: '8px 16px',
    background: '#EEE',
    borderBottom: '1px solid var(--primary-dark)',
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--tertiary)'
  }
}, children);
const CardContent = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '14px 16px',
    color: 'var(--tertiary)',
    ...style
  }
}, children);

// ---------- Input ----------
const Input = ({
  label,
  error,
  ...rest
}) => /*#__PURE__*/React.createElement("label", {
  style: {
    display: 'block'
  }
}, label && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--tertiary)',
    marginBottom: 4
  }
}, label), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
  style: {
    display: 'flex',
    height: 36,
    width: '100%',
    borderRadius: 6,
    border: `1px solid ${error ? 'var(--destructive)' : 'var(--input)'}`,
    background: '#fff',
    padding: '0 12px',
    fontSize: 14,
    boxShadow: '0 1px 2px rgba(0,0,0,.04)',
    color: 'var(--tertiary)',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    boxSizing: 'border-box'
  }
})), error && /*#__PURE__*/React.createElement("div", {
  style: {
    color: 'var(--destructive)',
    fontSize: 12,
    marginTop: 4
  }
}, error));

// ---------- PageHeader ----------
const PageHeader = ({
  title,
  menu,
  rightContent,
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    borderTop: 0,
    borderRadius: '0 0 12px 12px',
    padding: '12px 8px 12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 4
  }
}, /*#__PURE__*/React.createElement("h3", {
  style: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    color: 'var(--tertiary)'
  }
}, title), menu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
  style: {
    alignSelf: 'stretch',
    borderRight: '1px solid var(--tertiary)'
  }
}), menu)), children && /*#__PURE__*/React.createElement("div", {
  style: {
    paddingTop: 4,
    color: 'var(--tertiary)',
    fontSize: 14
  }
}, children)), /*#__PURE__*/React.createElement("div", null, rightContent));

// ---------- NavRow / LeftNav ----------
const NavRow = ({
  icon,
  label,
  active,
  collapsed,
  onClick
}) => /*#__PURE__*/React.createElement("div", {
  onClick: onClick,
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: collapsed ? '12px 0' : '10px 16px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    fontSize: 14,
    color: 'var(--tertiary)',
    cursor: 'pointer',
    background: active ? '#fff' : 'transparent',
    fontWeight: active ? 600 : 400,
    borderLeft: active && !collapsed ? '3px solid var(--primary)' : '3px solid transparent',
    paddingLeft: collapsed ? 0 : 13
  },
  onMouseEnter: e => {
    if (!active) e.currentTarget.style.background = 'var(--card-hover)';
  },
  onMouseLeave: e => {
    if (!active) e.currentTarget.style.background = 'transparent';
  }
}, icon, !collapsed && /*#__PURE__*/React.createElement("span", null, label));
const Divider = () => /*#__PURE__*/React.createElement("div", {
  style: {
    borderBottom: '1px solid var(--nav-border)',
    margin: '4px 0'
  }
});
const LeftNav = ({
  current,
  onNavigate,
  chats = []
}) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const items = [{
    key: 'home',
    label: 'Home',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "house-simple"
    })
  }, {
    key: 'artifacts',
    label: 'Curated Artifacts',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "compass-rose"
    })
  }, {
    key: 'procedures',
    label: 'Procedure Library',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "stack"
    })
  }, {
    key: 'sources',
    label: 'Regulatory Sources',
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "bank"
    })
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: collapsed ? 64 : 240,
      borderRight: '1px solid var(--nav-border)',
      background: 'var(--muted-lightest)',
      transition: 'width 150ms ease',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'space-between',
      padding: collapsed ? '12px 0' : '12px 12px 12px 16px',
      height: 56,
      boxSizing: 'border-box'
    }
  }, collapsed ? /*#__PURE__*/React.createElement("div", {
    onClick: () => setCollapsed(false),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 32
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LogoWithText, {
    height: 24,
    alt: true
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCollapsed(true),
    style: {
      background: 'transparent',
      border: 0,
      padding: 6,
      borderRadius: 6,
      cursor: 'pointer',
      color: 'gray'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sidebar-simple",
    size: 20,
    color: "gray"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavRow, {
    icon: items[0].icon,
    label: items[0].label,
    active: current === 'home',
    collapsed: collapsed,
    onClick: () => onNavigate('home')
  }), /*#__PURE__*/React.createElement(Divider, null), items.slice(1).map(it => /*#__PURE__*/React.createElement(NavRow, {
    key: it.key,
    icon: it.icon,
    label: it.label,
    active: current === it.key,
    collapsed: collapsed,
    onClick: () => onNavigate(it.key)
  })), /*#__PURE__*/React.createElement(Divider, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px 4px',
      color: 'var(--muted)',
      fontSize: 14
    }
  }, "Burst Chats"), chats.length === 0 ? !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px',
      color: 'var(--muted)',
      fontSize: 14,
      textAlign: 'center'
    }
  }, "No chats yet") : chats.map((c, i) => /*#__PURE__*/React.createElement(NavRow, {
    key: i,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "chat-circle",
      size: 18
    }),
    label: c,
    collapsed: collapsed
  }))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(NavRow, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "user-circle"
    }),
    label: "A. Morales",
    collapsed: collapsed
  }));
};

// ---------- Avatar ----------
const Avatar = ({
  size = 36
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    width: size,
    height: size,
    borderRadius: 9999,
    flex: 'none',
    background: `url('${window.__resources && window.__resources.chatAvatar || '../../assets/chat-avatar.png'}') center/cover, linear-gradient(to top left,var(--primary),var(--secondary))`
  }
});
Object.assign(window, {
  Logo,
  LogoWithText,
  Icon,
  Button,
  Badge,
  Card,
  CardTitle,
  CardContent,
  Input,
  PageHeader,
  LeftNav,
  NavRow,
  Divider,
  Avatar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/burst/components.standalone.jsx", error: String((e && e.message) || e) }); }

// ui_kits/burst/screens.jsx
try { (() => {
/* global React, Button, Badge, Card, CardTitle, CardContent, Input, PageHeader, LeftNav, Logo, LogoWithText, Icon, Avatar */

// ---------- Chat composer ----------
const ChatBox = ({
  placeholder = 'Ask Burst anything…',
  onSend
}) => {
  const [value, setValue] = React.useState('');
  const submit = () => {
    if (value.trim()) {
      onSend?.(value);
      setValue('');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(Avatar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 44,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 9999,
      padding: '0 6px 0 16px',
      boxShadow: '0 1px 2px rgba(0,0,0,.04)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => setValue(e.target.value),
    onKeyDown: e => e.key === 'Enter' && submit(),
    placeholder: placeholder,
    style: {
      flex: 1,
      border: 0,
      outline: 'none',
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      color: 'var(--tertiary)',
      background: 'transparent'
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9999,
      border: 0,
      background: 'transparent',
      color: 'var(--muted-dark)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    style: {
      width: 32,
      height: 32,
      borderRadius: 9999,
      border: 0,
      background: 'var(--primary)',
      color: '#fff',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up",
    size: 16,
    color: "#fff"
  }))));
};

// ---------- Login ----------
const Login = ({
  onLogin
}) => /*#__PURE__*/React.createElement("main", {
  style: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 64,
    gap: 48,
    background: `url('../../assets/background.png') center/100% 100% no-repeat, var(--tertiary)`
  }
}, /*#__PURE__*/React.createElement(Card, {
  style: {
    width: 384,
    border: '1px solid var(--primary)',
    boxShadow: '0 0 14px 2px hsla(189,100%,42%,0.45)',
    background: '#fff',
    padding: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'center',
    background: 'var(--tertiary)',
    padding: '24px 0'
  }
}, /*#__PURE__*/React.createElement(Logo, {
  size: 72
})), /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 24
  }
}, /*#__PURE__*/React.createElement(Button, {
  variant: "secondary",
  fullWidth: true,
  onClick: onLogin
}, "Login"))));

// ---------- Home ----------
const Home = ({
  onOpenArtifact,
  onNewChat
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    maxWidth: 920,
    margin: '0 auto'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  }
}, /*#__PURE__*/React.createElement(LogoWithText, {
  height: 32
})), /*#__PURE__*/React.createElement("h1", {
  style: {
    margin: 0,
    fontSize: 28,
    fontWeight: 600,
    color: 'var(--tertiary)'
  }
}, "Good afternoon, Alex."), /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--muted-dark)',
    fontSize: 16
  }
}, "Start from a regulatory source, upload a procedure, or continue a curation."), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 8
  }
}, /*#__PURE__*/React.createElement(ChatBox, {
  placeholder: "Ask Burst to start a new curation or find an artifact\u2026",
  onSend: onNewChat
})), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 14,
    marginTop: 8
  }
}, [{
  t: 'Reg S-P §248.30',
  s: 'Breach-notice timing',
  badges: [['requirement', 'REQ'], ['acceptance-criteria', 'AC']]
}, {
  t: 'AML Model Rule',
  s: 'Controls & attestations',
  badges: [['story', 'STY'], ['test', 'TST']]
}, {
  t: 'Basel III FRTB',
  s: 'Market-risk capital',
  badges: [['requirement', 'REQ'], ['story', 'STY']]
}].map((c, i) => /*#__PURE__*/React.createElement(Card, {
  key: i,
  style: {
    background: '#fff',
    cursor: 'pointer'
  }
}, /*#__PURE__*/React.createElement("div", {
  onClick: () => onOpenArtifact?.(c.t)
}, /*#__PURE__*/React.createElement(CardTitle, null, c.t), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 14,
    color: 'var(--tertiary)',
    marginBottom: 10
  }
}, c.s), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 6
  }
}, c.badges.map(([v, l]) => /*#__PURE__*/React.createElement(Badge, {
  key: l,
  variant: v
}, l)))))))));

// ---------- Curated Artifacts (table) ----------
const rows = [{
  id: 'REQ-482',
  title: 'Breach-notice timing',
  type: 'requirement',
  source: 'Reg S-P §248.30',
  status: ['success', 'Approved']
}, {
  id: 'STY-114',
  title: 'As a CISO I need timely notice…',
  type: 'story',
  source: 'Reg S-P §248.30',
  status: ['muted-dark', 'Draft']
}, {
  id: 'AC-920',
  title: '30-day notification window',
  type: 'acceptance-criteria',
  source: 'Reg S-P §248.30',
  status: ['requirement', 'In Review']
}, {
  id: 'TST-217',
  title: 'Breach detection → notice',
  type: 'test',
  source: 'Reg S-P §248.30',
  status: ['default', 'Pending']
}, {
  id: 'REQ-488',
  title: 'Board-level reporting cadence',
  type: 'requirement',
  source: 'AML Model Rule',
  status: ['success', 'Approved']
}, {
  id: 'STY-118',
  title: 'As an Ops lead I need evidence…',
  type: 'story',
  source: 'AML Model Rule',
  status: ['requirement', 'In Review']
}];
const typeLabel = {
  requirement: 'Requirement',
  story: 'Story',
  'acceptance-criteria': 'AC',
  test: 'Test'
};
const CuratedArtifacts = ({
  onOpenArtifact
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 24
  }
}, /*#__PURE__*/React.createElement(PageHeader, {
  title: "Curated Artifacts",
  menu: /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "burst"
  }, "6 items")),
  rightContent: /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary-outline",
    size: "sm"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    variant: "gradient",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14,
    color: "#fff"
  }), " New Curation"))
}, "Artifacts generated from regulatory sources and approved procedures."), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 16,
    border: '1px solid var(--border)',
    borderRadius: 12,
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,.08)'
  }
}, /*#__PURE__*/React.createElement("table", {
  style: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    fontSize: 14,
    fontFamily: 'var(--font-sans)'
  }
}, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['ID', 'Artifact', 'Type', 'Source', 'Status'].map(h => /*#__PURE__*/React.createElement("th", {
  key: h,
  style: {
    textAlign: 'left',
    padding: '10px 14px',
    background: '#EEE',
    color: 'var(--tertiary)',
    fontWeight: 600,
    borderBottom: '1px solid var(--primary-dark)',
    fontSize: 13
  }
}, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
  key: i,
  onClick: () => onOpenArtifact?.(r.id),
  style: {
    cursor: 'pointer'
  },
  onMouseEnter: e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'var(--card-hover)'),
  onMouseLeave: e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '#fff')
}, /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--link-foreground)',
    fontFamily: 'ui-monospace, monospace',
    fontSize: 13
  }
}, r.id), /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--tertiary)'
  }
}, r.title), /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)'
  }
}, /*#__PURE__*/React.createElement(Badge, {
  variant: r.type
}, typeLabel[r.type])), /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--muted-dark)'
  }
}, r.source), /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)'
  }
}, /*#__PURE__*/React.createElement(Badge, {
  variant: r.status[0]
}, r.status[1]))))))));

// ---------- Artifact Detail ----------
const ArtifactDetail = ({
  id = 'REQ-482'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }
}, /*#__PURE__*/React.createElement(PageHeader, {
  title: id,
  menu: /*#__PURE__*/React.createElement(Badge, {
    variant: "requirement"
  }, "Requirement"),
  rightContent: /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary-outline",
    size: "sm"
  }, "Reject"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Approve"))
}, "Reg S-P \xA7248.30 \xB7 v3 \xB7 Last edited 2 hours ago by A. Morales"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 16
  }
}, /*#__PURE__*/React.createElement(Card, {
  style: {
    background: '#fff'
  }
}, /*#__PURE__*/React.createElement(CardTitle, null, "Statement"), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.55
  }
}, "Institutions must provide notice to affected individuals within ", /*#__PURE__*/React.createElement("b", null, "30 calendar days"), " of the discovery of a breach involving sensitive customer information, unless a law-enforcement delay has been requested in writing."), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 12,
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap'
  }
}, /*#__PURE__*/React.createElement(Badge, {
  variant: "acceptance-criteria"
}, "AC-920"), /*#__PURE__*/React.createElement(Badge, {
  variant: "story"
}, "STY-114"), /*#__PURE__*/React.createElement(Badge, {
  variant: "test"
}, "TST-217"), /*#__PURE__*/React.createElement(Badge, {
  variant: "link"
}, "Reg S-P \xA7248.30")))), /*#__PURE__*/React.createElement(Card, {
  style: {
    background: '#fff'
  }
}, /*#__PURE__*/React.createElement(CardTitle, null, "Trace"), /*#__PURE__*/React.createElement(CardContent, {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    fontSize: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Source"), /*#__PURE__*/React.createElement("span", null, "Reg S-P \xA7248.30")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Effective"), /*#__PURE__*/React.createElement("span", null, "2026-01-15")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Jurisdiction"), /*#__PURE__*/React.createElement("span", null, "US \u2014 SEC")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Owner"), /*#__PURE__*/React.createElement("span", null, "A. Morales")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Status"), /*#__PURE__*/React.createElement(Badge, {
  variant: "success"
}, "Approved"))))), /*#__PURE__*/React.createElement(Card, {
  style: {
    background: '#fff'
  }
}, /*#__PURE__*/React.createElement(CardTitle, null, "Chat"), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 12
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    alignSelf: 'flex-end',
    maxWidth: '70%',
    background: 'var(--primary-light)',
    color: 'var(--tertiary)',
    padding: '10px 14px',
    borderRadius: 14
  }
}, "Why 30 days and not 60?"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-start'
  }
}, /*#__PURE__*/React.createElement(Avatar, {
  size: 28
}), /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: '80%',
    background: 'var(--muted-lightest)',
    color: 'var(--tertiary)',
    padding: '10px 14px',
    borderRadius: 14,
    fontSize: 14
  }
}, "Reg S-P \xA7248.30(a)(3) sets the 30-day window from discovery; the SEC's 2024 amendments rejected a 60-day alternative. Would you like me to generate an acceptance criterion covering the law-enforcement delay carve-out?"))), /*#__PURE__*/React.createElement(ChatBox, {
  placeholder: "Ask Burst about this artifact\u2026"
}))));
Object.assign(window, {
  Login,
  Home,
  CuratedArtifacts,
  ArtifactDetail,
  ChatBox
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/burst/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/burst/screens.standalone.jsx
try { (() => {
/* global React, Button, Badge, Card, CardTitle, CardContent, Input, PageHeader, LeftNav, Logo, LogoWithText, Icon, Avatar */

// ---------- Chat composer ----------
const ChatBox = ({
  placeholder = 'Ask Burst anything…',
  onSend
}) => {
  const [value, setValue] = React.useState('');
  const submit = () => {
    if (value.trim()) {
      onSend?.(value);
      setValue('');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(Avatar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 44,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 9999,
      padding: '0 6px 0 16px',
      boxShadow: '0 1px 2px rgba(0,0,0,.04)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => setValue(e.target.value),
    onKeyDown: e => e.key === 'Enter' && submit(),
    placeholder: placeholder,
    style: {
      flex: 1,
      border: 0,
      outline: 'none',
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      color: 'var(--tertiary)',
      background: 'transparent'
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9999,
      border: 0,
      background: 'transparent',
      color: 'var(--muted-dark)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    style: {
      width: 32,
      height: 32,
      borderRadius: 9999,
      border: 0,
      background: 'var(--primary)',
      color: '#fff',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up",
    size: 16,
    color: "#fff"
  }))));
};

// ---------- Login ----------
const Login = ({
  onLogin
}) => /*#__PURE__*/React.createElement("main", {
  style: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 64,
    gap: 48,
    background: `url('${window.__resources && window.__resources.background || '../../assets/background.png'}') center/100% 100% no-repeat, var(--tertiary)`
  }
}, /*#__PURE__*/React.createElement(Card, {
  style: {
    width: 384,
    border: '1px solid var(--primary)',
    boxShadow: '0 0 14px 2px hsla(189,100%,42%,0.45)',
    background: '#fff',
    padding: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'center',
    background: 'var(--tertiary)',
    padding: '24px 0'
  }
}, /*#__PURE__*/React.createElement(Logo, {
  size: 72
})), /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 24
  }
}, /*#__PURE__*/React.createElement(Button, {
  variant: "secondary",
  fullWidth: true,
  onClick: onLogin
}, "Login"))));

// ---------- Home ----------
const Home = ({
  onOpenArtifact,
  onNewChat
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    maxWidth: 920,
    margin: '0 auto'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  }
}, /*#__PURE__*/React.createElement(LogoWithText, {
  height: 32
})), /*#__PURE__*/React.createElement("h1", {
  style: {
    margin: 0,
    fontSize: 28,
    fontWeight: 600,
    color: 'var(--tertiary)'
  }
}, "Good afternoon, Alex."), /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--muted-dark)',
    fontSize: 16
  }
}, "Start from a regulatory source, upload a procedure, or continue a curation."), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 8
  }
}, /*#__PURE__*/React.createElement(ChatBox, {
  placeholder: "Ask Burst to start a new curation or find an artifact\u2026",
  onSend: onNewChat
})), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 14,
    marginTop: 8
  }
}, [{
  t: 'Reg S-P §248.30',
  s: 'Breach-notice timing',
  badges: [['requirement', 'REQ'], ['acceptance-criteria', 'AC']]
}, {
  t: 'AML Model Rule',
  s: 'Controls & attestations',
  badges: [['story', 'STY'], ['test', 'TST']]
}, {
  t: 'Basel III FRTB',
  s: 'Market-risk capital',
  badges: [['requirement', 'REQ'], ['story', 'STY']]
}].map((c, i) => /*#__PURE__*/React.createElement(Card, {
  key: i,
  style: {
    background: '#fff',
    cursor: 'pointer'
  }
}, /*#__PURE__*/React.createElement("div", {
  onClick: () => onOpenArtifact?.(c.t)
}, /*#__PURE__*/React.createElement(CardTitle, null, c.t), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 14,
    color: 'var(--tertiary)',
    marginBottom: 10
  }
}, c.s), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 6
  }
}, c.badges.map(([v, l]) => /*#__PURE__*/React.createElement(Badge, {
  key: l,
  variant: v
}, l)))))))));

// ---------- Curated Artifacts (table) ----------
const rows = [{
  id: 'REQ-482',
  title: 'Breach-notice timing',
  type: 'requirement',
  source: 'Reg S-P §248.30',
  status: ['success', 'Approved']
}, {
  id: 'STY-114',
  title: 'As a CISO I need timely notice…',
  type: 'story',
  source: 'Reg S-P §248.30',
  status: ['muted-dark', 'Draft']
}, {
  id: 'AC-920',
  title: '30-day notification window',
  type: 'acceptance-criteria',
  source: 'Reg S-P §248.30',
  status: ['requirement', 'In Review']
}, {
  id: 'TST-217',
  title: 'Breach detection → notice',
  type: 'test',
  source: 'Reg S-P §248.30',
  status: ['default', 'Pending']
}, {
  id: 'REQ-488',
  title: 'Board-level reporting cadence',
  type: 'requirement',
  source: 'AML Model Rule',
  status: ['success', 'Approved']
}, {
  id: 'STY-118',
  title: 'As an Ops lead I need evidence…',
  type: 'story',
  source: 'AML Model Rule',
  status: ['requirement', 'In Review']
}];
const typeLabel = {
  requirement: 'Requirement',
  story: 'Story',
  'acceptance-criteria': 'AC',
  test: 'Test'
};
const CuratedArtifacts = ({
  onOpenArtifact
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 24
  }
}, /*#__PURE__*/React.createElement(PageHeader, {
  title: "Curated Artifacts",
  menu: /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "burst"
  }, "6 items")),
  rightContent: /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary-outline",
    size: "sm"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    variant: "gradient",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14,
    color: "#fff"
  }), " New Curation"))
}, "Artifacts generated from regulatory sources and approved procedures."), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 16,
    border: '1px solid var(--border)',
    borderRadius: 12,
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,.08)'
  }
}, /*#__PURE__*/React.createElement("table", {
  style: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    fontSize: 14,
    fontFamily: 'var(--font-sans)'
  }
}, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['ID', 'Artifact', 'Type', 'Source', 'Status'].map(h => /*#__PURE__*/React.createElement("th", {
  key: h,
  style: {
    textAlign: 'left',
    padding: '10px 14px',
    background: '#EEE',
    color: 'var(--tertiary)',
    fontWeight: 600,
    borderBottom: '1px solid var(--primary-dark)',
    fontSize: 13
  }
}, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
  key: i,
  onClick: () => onOpenArtifact?.(r.id),
  style: {
    cursor: 'pointer'
  },
  onMouseEnter: e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'var(--card-hover)'),
  onMouseLeave: e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '#fff')
}, /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--link-foreground)',
    fontFamily: 'ui-monospace, monospace',
    fontSize: 13
  }
}, r.id), /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--tertiary)'
  }
}, r.title), /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)'
  }
}, /*#__PURE__*/React.createElement(Badge, {
  variant: r.type
}, typeLabel[r.type])), /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--muted-dark)'
  }
}, r.source), /*#__PURE__*/React.createElement("td", {
  style: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border)'
  }
}, /*#__PURE__*/React.createElement(Badge, {
  variant: r.status[0]
}, r.status[1]))))))));

// ---------- Artifact Detail ----------
const ArtifactDetail = ({
  id = 'REQ-482'
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }
}, /*#__PURE__*/React.createElement(PageHeader, {
  title: id,
  menu: /*#__PURE__*/React.createElement(Badge, {
    variant: "requirement"
  }, "Requirement"),
  rightContent: /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary-outline",
    size: "sm"
  }, "Reject"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Approve"))
}, "Reg S-P \xA7248.30 \xB7 v3 \xB7 Last edited 2 hours ago by A. Morales"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 16
  }
}, /*#__PURE__*/React.createElement(Card, {
  style: {
    background: '#fff'
  }
}, /*#__PURE__*/React.createElement(CardTitle, null, "Statement"), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.55
  }
}, "Institutions must provide notice to affected individuals within ", /*#__PURE__*/React.createElement("b", null, "30 calendar days"), " of the discovery of a breach involving sensitive customer information, unless a law-enforcement delay has been requested in writing."), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 12,
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap'
  }
}, /*#__PURE__*/React.createElement(Badge, {
  variant: "acceptance-criteria"
}, "AC-920"), /*#__PURE__*/React.createElement(Badge, {
  variant: "story"
}, "STY-114"), /*#__PURE__*/React.createElement(Badge, {
  variant: "test"
}, "TST-217"), /*#__PURE__*/React.createElement(Badge, {
  variant: "link"
}, "Reg S-P \xA7248.30")))), /*#__PURE__*/React.createElement(Card, {
  style: {
    background: '#fff'
  }
}, /*#__PURE__*/React.createElement(CardTitle, null, "Trace"), /*#__PURE__*/React.createElement(CardContent, {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    fontSize: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Source"), /*#__PURE__*/React.createElement("span", null, "Reg S-P \xA7248.30")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Effective"), /*#__PURE__*/React.createElement("span", null, "2026-01-15")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Jurisdiction"), /*#__PURE__*/React.createElement("span", null, "US \u2014 SEC")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Owner"), /*#__PURE__*/React.createElement("span", null, "A. Morales")), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'var(--muted-dark)'
  }
}, "Status"), /*#__PURE__*/React.createElement(Badge, {
  variant: "success"
}, "Approved"))))), /*#__PURE__*/React.createElement(Card, {
  style: {
    background: '#fff'
  }
}, /*#__PURE__*/React.createElement(CardTitle, null, "Chat"), /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 12
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    alignSelf: 'flex-end',
    maxWidth: '70%',
    background: 'var(--primary-light)',
    color: 'var(--tertiary)',
    padding: '10px 14px',
    borderRadius: 14
  }
}, "Why 30 days and not 60?"), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-start'
  }
}, /*#__PURE__*/React.createElement(Avatar, {
  size: 28
}), /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: '80%',
    background: 'var(--muted-lightest)',
    color: 'var(--tertiary)',
    padding: '10px 14px',
    borderRadius: 14,
    fontSize: 14
  }
}, "Reg S-P \xA7248.30(a)(3) sets the 30-day window from discovery; the SEC's 2024 amendments rejected a 60-day alternative. Would you like me to generate an acceptance criterion covering the law-enforcement delay carve-out?"))), /*#__PURE__*/React.createElement(ChatBox, {
  placeholder: "Ask Burst about this artifact\u2026"
}))));
Object.assign(window, {
  Login,
  Home,
  CuratedArtifacts,
  ArtifactDetail,
  ChatBox
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/burst/screens.standalone.jsx", error: String((e && e.message) || e) }); }

// ui_kits/burst_shadcn/shadcn.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */

// ---------- Icon (Phosphor via CDN class names) ----------
const Icon = ({
  name,
  size = 16,
  color,
  style,
  weight = 'regular'
}) => /*#__PURE__*/React.createElement("i", {
  className: `ph${weight === 'regular' ? '' : '-' + weight} ph-${name}`,
  style: {
    fontSize: size,
    color,
    lineHeight: 1,
    ...style
  }
});

// ---------- Button ----------
const cn = (...xs) => xs.filter(Boolean).join(' ');
const Button = React.forwardRef(({
  variant = 'default',
  size = 'md',
  asChild,
  className,
  children,
  ...rest
}, ref) => /*#__PURE__*/React.createElement("button", _extends({
  ref: ref,
  className: cn('sx-btn', `sx-btn-${variant}`, `sx-btn-${size}`, className)
}, rest), children));

// ---------- Input / Textarea / Label ----------
const Input = React.forwardRef(({
  invalid,
  className,
  ...rest
}, ref) => /*#__PURE__*/React.createElement("input", _extends({
  ref: ref,
  className: cn('sx-input', invalid && 'sx-invalid', className)
}, rest)));
const Textarea = ({
  invalid,
  className,
  ...rest
}) => /*#__PURE__*/React.createElement("textarea", _extends({
  className: cn('sx-textarea', invalid && 'sx-invalid', className)
}, rest));
const Label = ({
  htmlFor,
  children,
  className
}) => /*#__PURE__*/React.createElement("label", {
  htmlFor: htmlFor,
  className: cn('sx-label', className)
}, children);

// Helper: a labeled field group
const Field = ({
  label,
  hint,
  error,
  children,
  htmlFor
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6
  }
}, label && /*#__PURE__*/React.createElement(Label, {
  htmlFor: htmlFor
}, label), children, error ? /*#__PURE__*/React.createElement("span", {
  className: "sx-help sx-help-error"
}, error) : hint && /*#__PURE__*/React.createElement("span", {
  className: "sx-help"
}, hint));

// ---------- Badge ----------
const Badge = ({
  variant = 'default',
  children,
  className,
  style
}) => /*#__PURE__*/React.createElement("span", {
  className: cn('sx-badge', `sx-badge-${variant}`, className),
  style: style
}, children);

// ---------- Card ----------
const Card = ({
  children,
  className,
  style
}) => /*#__PURE__*/React.createElement("div", {
  className: cn('sx-card', className),
  style: style
}, children);
const CardHeader = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-card-header"
}, children);
const CardTitle = ({
  children
}) => /*#__PURE__*/React.createElement("h3", {
  className: "sx-card-title"
}, children);
const CardDescription = ({
  children
}) => /*#__PURE__*/React.createElement("p", {
  className: "sx-card-desc"
}, children);
const CardContent = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-card-content",
  style: style
}, children);
const CardFooter = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-card-footer",
  style: style
}, children);

// ---------- Separator ----------
const Separator = ({
  orientation = 'horizontal',
  style
}) => /*#__PURE__*/React.createElement("div", {
  className: cn('sx-sep', orientation === 'horizontal' ? 'sx-sep-h' : 'sx-sep-v'),
  style: style,
  role: "separator"
});

// ---------- Alert ----------
const Alert = ({
  variant = 'default',
  icon,
  title,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: cn('sx-alert', variant !== 'default' && `sx-alert-${variant}`),
  role: "alert"
}, /*#__PURE__*/React.createElement("span", {
  className: "sx-alert-icon"
}, icon || /*#__PURE__*/React.createElement(Icon, {
  name: variant === 'destructive' ? 'warning' : variant === 'success' ? 'check-circle' : 'info',
  size: 18
})), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h5", {
  className: "sx-alert-title"
}, title), children && /*#__PURE__*/React.createElement("p", {
  className: "sx-alert-desc"
}, children)));

// ---------- Avatar ----------
const Avatar = ({
  src,
  alt,
  fallback,
  size = 'md',
  style
}) => {
  const [err, setErr] = React.useState(!src);
  const cls = size === 'sm' ? 'sx-avatar sx-avatar-sm' : size === 'lg' ? 'sx-avatar sx-avatar-lg' : 'sx-avatar';
  return /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: style
  }, !err && src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    onError: () => setErr(true)
  }) : /*#__PURE__*/React.createElement("span", null, fallback));
};

// ---------- Checkbox / Radio / Switch ----------
const Checkbox = ({
  checked,
  defaultChecked,
  onChange,
  id,
  disabled
}) => /*#__PURE__*/React.createElement("input", {
  type: "checkbox",
  id: id,
  disabled: disabled,
  className: "sx-check",
  checked: checked,
  defaultChecked: defaultChecked,
  onChange: onChange
});
const Radio = ({
  checked,
  defaultChecked,
  onChange,
  name,
  value,
  id,
  disabled
}) => /*#__PURE__*/React.createElement("input", {
  type: "radio",
  id: id,
  name: name,
  value: value,
  disabled: disabled,
  className: "sx-radio",
  checked: checked,
  defaultChecked: defaultChecked,
  onChange: onChange
});
const Switch = ({
  checked,
  onCheckedChange,
  id,
  disabled
}) => /*#__PURE__*/React.createElement("button", {
  type: "button",
  id: id,
  role: "switch",
  "aria-checked": !!checked,
  disabled: disabled,
  "data-state": checked ? 'on' : 'off',
  className: "sx-switch",
  onClick: () => onCheckedChange?.(!checked)
});

// ---------- Tabs ----------
const TabsCtx = React.createContext(null);
const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  style
}) => {
  const [internal, setInternal] = React.useState(defaultValue);
  const v = value ?? internal;
  const set = nv => {
    if (value === undefined) setInternal(nv);
    onValueChange?.(nv);
  };
  return /*#__PURE__*/React.createElement(TabsCtx.Provider, {
    value: {
      value: v,
      set
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: style
  }, children));
};
const TabsList = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-tabs-list",
  style: style
}, children);
const TabsTrigger = ({
  value,
  children
}) => {
  const ctx = React.useContext(TabsCtx);
  return /*#__PURE__*/React.createElement("button", {
    className: "sx-tabs-trigger",
    "data-state": ctx.value === value ? 'active' : 'inactive',
    onClick: () => ctx.set(value)
  }, children);
};
const TabsContent = ({
  value,
  children,
  style
}) => {
  const ctx = React.useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 16,
      ...style
    }
  }, children);
};

// ---------- Table ----------
const Table = ({
  children
}) => /*#__PURE__*/React.createElement("table", {
  className: "sx-table"
}, children);

// ---------- Progress ----------
const Progress = ({
  value = 0,
  style
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-progress",
  style: style,
  role: "progressbar",
  "aria-valuenow": value,
  "aria-valuemin": 0,
  "aria-valuemax": 100
}, /*#__PURE__*/React.createElement("div", {
  className: "sx-progress-bar",
  style: {
    width: `${Math.max(0, Math.min(100, value))}%`
  }
}));

// ---------- Slider (visual; controlled value) ----------
const Slider = ({
  value = 50,
  min = 0,
  max = 100,
  onChange,
  style
}) => {
  const pct = (value - min) / (max - min) * 100;
  const ref = React.useRef(null);
  const handle = e => {
    if (!ref.current || !onChange) return;
    const r = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    onChange(Math.round(min + x * (max - min)));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "sx-slider",
    style: style,
    onMouseDown: e => {
      handle(e);
      const mv = ev => handle(ev);
      const up = () => {
        window.removeEventListener('mousemove', mv);
        window.removeEventListener('mouseup', up);
      };
      window.addEventListener('mousemove', mv);
      window.addEventListener('mouseup', up);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sx-slider-track",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "sx-slider-range",
    style: {
      width: `${pct}%`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "sx-slider-thumb",
    style: {
      left: `${pct}%`
    }
  })));
};

// ---------- Skeleton ----------
const Skeleton = ({
  style
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-skeleton",
  style: style
});

// ---------- Breadcrumb ----------
const Breadcrumb = ({
  items
}) => /*#__PURE__*/React.createElement("nav", {
  className: "sx-breadcrumb",
  "aria-label": "Breadcrumb"
}, items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
  key: i
}, i > 0 && /*#__PURE__*/React.createElement("span", {
  className: "sx-breadcrumb-sep"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "caret-right",
  size: 12
})), it.current ? /*#__PURE__*/React.createElement("span", {
  className: "sx-current"
}, it.label) : /*#__PURE__*/React.createElement("a", {
  href: it.href || '#'
}, it.label))));

// ---------- Pagination (visual) ----------
const Pagination = ({
  page = 1,
  total = 5,
  onChange
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-pagination"
}, /*#__PURE__*/React.createElement(Button, {
  variant: "outline",
  size: "sm",
  disabled: page === 1,
  onClick: () => onChange?.(page - 1)
}, /*#__PURE__*/React.createElement(Icon, {
  name: "caret-left",
  size: 14
}), " Prev"), Array.from({
  length: total
}).map((_, i) => {
  const n = i + 1;
  return /*#__PURE__*/React.createElement(Button, {
    key: n,
    variant: "outline",
    size: "sm",
    "data-state": n === page ? 'active' : undefined,
    onClick: () => onChange?.(n),
    style: {
      width: 32,
      padding: 0,
      fontWeight: n === page ? 600 : 500
    }
  }, n);
}), /*#__PURE__*/React.createElement(Button, {
  variant: "outline",
  size: "sm",
  disabled: page === total,
  onClick: () => onChange?.(page + 1)
}, "Next ", /*#__PURE__*/React.createElement(Icon, {
  name: "caret-right",
  size: 14
})));

// ---------- Tooltip (CSS-only via hover wrapper) ----------
const Tooltip = ({
  content,
  children
}) => {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, children, open && /*#__PURE__*/React.createElement("span", {
    className: "sx-tooltip",
    style: {
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }, content));
};

// ---------- Toast (static demo) ----------
const Toast = ({
  title,
  children,
  action
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-toast"
}, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("p", {
  className: "sx-toast-title"
}, title), children && /*#__PURE__*/React.createElement("p", {
  className: "sx-toast-desc"
}, children)), action);

// ---------- Dropdown Menu (controlled, click-to-toggle) ----------
const DropdownMenu = ({
  trigger,
  children,
  align = 'start',
  width = 220
}) => {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('mousedown', onDoc);
    return () => window.removeEventListener('mousedown', onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("span", {
    ref: wrapRef,
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o)
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    className: "sx-menu",
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      [align]: 0,
      minWidth: width,
      zIndex: 50
    }
  }, children));
};
const MenuLabel = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-menu-label"
}, children);
const MenuItem = ({
  icon,
  shortcut,
  danger,
  onClick,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: cn('sx-menu-item', danger && 'sx-menu-item-danger'),
  onClick: onClick
}, icon && /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    width: 16,
    justifyContent: 'center'
  }
}, icon), /*#__PURE__*/React.createElement("span", null, children), shortcut && /*#__PURE__*/React.createElement("span", {
  className: "sx-menu-shortcut"
}, shortcut));
const MenuSeparator = () => /*#__PURE__*/React.createElement("div", {
  className: "sx-menu-sep"
});

// ---------- Select (visual / mock) ----------
const Select = ({
  options = [],
  value,
  onValueChange,
  placeholder = 'Select…',
  disabled
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('mousedown', onDoc);
    return () => window.removeEventListener('mousedown', onDoc);
  }, []);
  const selected = options.find(o => o.value === value);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => setOpen(o => !o),
    className: "sx-input",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      background: '#fff',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: selected ? 'var(--sx-foreground)' : 'var(--muted)'
    }
  }, selected ? selected.label : placeholder), /*#__PURE__*/React.createElement(Icon, {
    name: "caret-up-down",
    size: 14,
    color: "var(--muted-dark)"
  })), open && /*#__PURE__*/React.createElement("div", {
    className: "sx-menu",
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: 0,
      right: 0,
      zIndex: 50
    }
  }, options.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.value,
    className: "sx-menu-item",
    onClick: () => {
      onValueChange?.(o.value);
      setOpen(false);
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 16,
      justifyContent: 'center'
    }
  }, value === o.value && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    color: "var(--sx-primary)"
  })), /*#__PURE__*/React.createElement("span", null, o.label)))));
};

// ---------- Dialog (controlled; renders within a relative container, not portal) ----------
const Dialog = ({
  open,
  onOpenChange,
  children
}) => {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "sx-dialog-backdrop",
    onClick: () => onOpenChange?.(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "sx-dialog",
    onClick: e => e.stopPropagation()
  }, children));
};
const DialogTitle = ({
  children
}) => /*#__PURE__*/React.createElement("h3", {
  className: "sx-dialog-title"
}, children);
const DialogDescription = ({
  children
}) => /*#__PURE__*/React.createElement("p", {
  className: "sx-dialog-desc"
}, children);
const DialogFooter = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: "sx-dialog-footer"
}, children);

// ---------- Command palette (visual demo) ----------
const Command = ({
  groups = [],
  placeholder = 'Type a command or search…'
}) => {
  const [q, setQ] = React.useState('');
  const filt = label => label.toLowerCase().includes(q.toLowerCase());
  return /*#__PURE__*/React.createElement("div", {
    className: "sx-command"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sx-command-input-wrap"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "magnifying-glass",
    size: 16,
    color: "var(--muted-dark)"
  }), /*#__PURE__*/React.createElement("input", {
    className: "sx-command-input",
    placeholder: placeholder,
    value: q,
    onChange: e => setQ(e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "sx-menu-shortcut"
  }, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    className: "sx-command-list"
  }, groups.map((g, gi) => {
    const items = g.items.filter(it => filt(it.label));
    if (!items.length) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: gi
    }, /*#__PURE__*/React.createElement("div", {
      className: "sx-command-group-label"
    }, g.label), items.map((it, ii) => /*#__PURE__*/React.createElement("div", {
      key: ii,
      className: "sx-menu-item"
    }, it.icon, /*#__PURE__*/React.createElement("span", null, it.label), it.shortcut && /*#__PURE__*/React.createElement("span", {
      className: "sx-menu-shortcut"
    }, it.shortcut))));
  })));
};

// ---------- Calendar (read-only preview) ----------
const Calendar = ({
  year = 2026,
  month = 4,
  selected = 14
}) => {
  // month: 0-indexed; default May 2026
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const startDow = first.getDay();
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push({
    day: prevDays - startDow + 1 + i,
    muted: true
  });
  for (let d = 1; d <= daysInMonth; d++) cells.push({
    day: d
  });
  while (cells.length % 7 !== 0) cells.push({
    day: cells.length - daysInMonth - startDow + 1,
    muted: true
  });
  const monthName = first.toLocaleString('en-US', {
    month: 'long'
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "sx-cal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sx-cal-head"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "caret-left",
    size: 14
  })), /*#__PURE__*/React.createElement("span", {
    className: "sx-cal-month"
  }, monthName, " ", year), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "caret-right",
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sx-cal-grid"
  }, ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    className: "sx-cal-dow"
  }, d)), cells.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "sx-cal-day",
    "data-muted": c.muted ? 'true' : 'false',
    "data-state": !c.muted && c.day === selected ? 'selected' : !c.muted && c.day === 22 ? 'today' : undefined
  }, c.day))));
};
Object.assign(window, {
  cn,
  Icon,
  Button,
  Input,
  Textarea,
  Label,
  Field,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Separator,
  Alert,
  Avatar,
  Checkbox,
  Radio,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  Progress,
  Slider,
  Skeleton,
  Breadcrumb,
  Pagination,
  Tooltip,
  Toast,
  DropdownMenu,
  MenuLabel,
  MenuItem,
  MenuSeparator,
  Select,
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Command,
  Calendar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/burst_shadcn/shadcn.jsx", error: String((e && e.message) || e) }); }

// ui_kits/burst_shadcn/showcase.jsx
try { (() => {
/* global React, cn, Icon, Button, Input, Textarea, Label, Field, Badge,
   Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
   Separator, Alert, Avatar, Checkbox, Radio, Switch,
   Tabs, TabsList, TabsTrigger, TabsContent,
   Table, Progress, Slider, Skeleton,
   Breadcrumb, Pagination, Tooltip, Toast,
   DropdownMenu, MenuLabel, MenuItem, MenuSeparator,
   Select, Dialog, DialogTitle, DialogDescription, DialogFooter,
   Command, Calendar */

// ---------- Layout helpers ----------
const Section = ({
  id,
  title,
  eyebrow,
  children
}) => /*#__PURE__*/React.createElement("section", {
  id: id,
  style: {
    scrollMarginTop: 80,
    padding: '32px 0'
  }
}, /*#__PURE__*/React.createElement("header", {
  style: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }
}, eyebrow && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--sx-muted-foreground)'
  }
}, eyebrow), /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: 'var(--sx-foreground)'
  }
}, title)), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }
}, children));
const Demo = ({
  title,
  children,
  style
}) => /*#__PURE__*/React.createElement(Card, null, title && /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, title)), /*#__PURE__*/React.createElement(CardContent, {
  style: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    ...style
  }
}, children));

// ---------- Sections ----------
const ButtonsSection = () => /*#__PURE__*/React.createElement(Section, {
  id: "buttons",
  eyebrow: "Action",
  title: "Button"
}, /*#__PURE__*/React.createElement(Demo, {
  title: "Variants"
}, /*#__PURE__*/React.createElement(Button, null, "Default"), /*#__PURE__*/React.createElement(Button, {
  variant: "secondary"
}, "Secondary"), /*#__PURE__*/React.createElement(Button, {
  variant: "outline"
}, "Outline"), /*#__PURE__*/React.createElement(Button, {
  variant: "ghost"
}, "Ghost"), /*#__PURE__*/React.createElement(Button, {
  variant: "link"
}, "Link"), /*#__PURE__*/React.createElement(Button, {
  variant: "destructive"
}, "Destructive"), /*#__PURE__*/React.createElement(Button, {
  variant: "navy"
}, "Navy"), /*#__PURE__*/React.createElement(Button, {
  variant: "phoenix"
}, "Phoenix")), /*#__PURE__*/React.createElement(Demo, {
  title: "Sizes"
}, /*#__PURE__*/React.createElement(Button, {
  size: "sm"
}, "Small"), /*#__PURE__*/React.createElement(Button, {
  size: "md"
}, "Default"), /*#__PURE__*/React.createElement(Button, {
  size: "lg"
}, "Large"), /*#__PURE__*/React.createElement(Button, {
  size: "icon",
  variant: "outline"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "gear",
  size: 16
}))), /*#__PURE__*/React.createElement(Demo, {
  title: "With icons"
}, /*#__PURE__*/React.createElement(Button, null, /*#__PURE__*/React.createElement(Icon, {
  name: "plus",
  size: 14
}), " New artifact"), /*#__PURE__*/React.createElement(Button, {
  variant: "outline"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "download-simple",
  size: 14
}), " Export"), /*#__PURE__*/React.createElement(Button, {
  variant: "secondary"
}, "Continue ", /*#__PURE__*/React.createElement(Icon, {
  name: "arrow-right",
  size: 14
})), /*#__PURE__*/React.createElement(Button, {
  variant: "destructive"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "trash",
  size: 14
}), " Delete"), /*#__PURE__*/React.createElement(Button, {
  disabled: true
}, "Disabled")));
const FormSection = () => {
  const [pwd, setPwd] = React.useState('');
  const [sel, setSel] = React.useState('reg-sp');
  const [checked, setChecked] = React.useState(true);
  const [sw, setSw] = React.useState(true);
  return /*#__PURE__*/React.createElement(Section, {
    id: "forms",
    eyebrow: "Inputs",
    title: "Form controls"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Sign in"), /*#__PURE__*/React.createElement(CardDescription, null, "Use your Phoenix Burst credentials to continue.")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    htmlFor: "email"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "email",
    type: "email",
    placeholder: "alex@phoenix.co",
    defaultValue: "alex@phoenix.co"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Password",
    htmlFor: "pwd",
    hint: "At least 12 characters",
    error: pwd.length > 0 && pwd.length < 6 ? 'Password is too short.' : null
  }, /*#__PURE__*/React.createElement(Input, {
    id: "pwd",
    type: "password",
    value: pwd,
    onChange: e => setPwd(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    invalid: pwd.length > 0 && pwd.length < 6
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "remember",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Label, {
    htmlFor: "remember"
  }, "Remember this device for 30 days"))), /*#__PURE__*/React.createElement(CardFooter, {
    style: {
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, "Forgot password?"), /*#__PURE__*/React.createElement(Button, null, "Sign in"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Curation settings"), /*#__PURE__*/React.createElement(CardDescription, null, "Configure how Burst generates artifacts for this source.")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Source",
    htmlFor: "src"
  }, /*#__PURE__*/React.createElement(Select, {
    value: sel,
    onValueChange: setSel,
    options: [{
      value: 'reg-sp',
      label: 'Reg S-P §248.30'
    }, {
      value: 'aml',
      label: 'AML Model Rule'
    }, {
      value: 'mifid',
      label: 'MiFID II — Suitability'
    }, {
      value: 'sox',
      label: 'SOX §404 controls'
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Notes",
    htmlFor: "notes",
    hint: "Optional \u2014 visible to reviewers"
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "notes",
    placeholder: "Outline the scope of this curation\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Generate"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['Requirements', true], ['User stories', true], ['Acceptance criteria', false], ['Tests', false]].map(([l, def], i) => /*#__PURE__*/React.createElement("label", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: def
  }), /*#__PURE__*/React.createElement("span", null, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Auto-notify reviewers"), /*#__PURE__*/React.createElement("p", {
    className: "sx-help",
    style: {
      marginTop: 2
    }
  }, "Send a Slack DM when the run completes.")), /*#__PURE__*/React.createElement(Switch, {
    checked: sw,
    onCheckedChange: setSw
  }))), /*#__PURE__*/React.createElement(CardFooter, {
    style: {
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, null, "Save changes")))), /*#__PURE__*/React.createElement(Demo, {
    title: "Other inputs"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Search"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "magnifying-glass",
    size: 14,
    color: "var(--muted-dark)",
    style: {
      position: 'absolute',
      left: 10,
      top: 11
    }
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search artifacts\u2026",
    style: {
      paddingLeft: 32
    }
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Disabled"
  }, /*#__PURE__*/React.createElement(Input, {
    disabled: true,
    placeholder: "Disabled input"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Invalid",
    error: "This value is required."
  }, /*#__PURE__*/React.createElement(Input, {
    invalid: true,
    placeholder: "Required"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Visibility"), ['Private', 'Team', 'Org'].map((l, i) => /*#__PURE__*/React.createElement("label", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "visibility",
    defaultChecked: i === 1
  }), l)))));
};
const FeedbackSection = () => {
  const [prog, setProg] = React.useState(64);
  const [slider, setSlider] = React.useState(38);
  return /*#__PURE__*/React.createElement(Section, {
    id: "feedback",
    eyebrow: "Status",
    title: "Feedback"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    title: "Heads up",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "info",
      size: 18
    })
  }, "A new version of Reg S-P \xA7248.30 was published 4 minutes ago. Re-run the curation to incorporate the changes."), /*#__PURE__*/React.createElement(Alert, {
    variant: "destructive",
    title: "Connection lost",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "warning",
      size: 18
    })
  }, "We couldn't reach the regulatory source. Saved drafts are still available locally."), /*#__PURE__*/React.createElement(Alert, {
    variant: "success",
    title: "Curation complete",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      size: 18
    })
  }, "12 requirements and 38 acceptance criteria are ready for review."), /*#__PURE__*/React.createElement(Toast, {
    title: "Artifact exported",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "Undo")
  }, "Reg-SP-Breach-Notice.docx was saved to your downloads.")), /*#__PURE__*/React.createElement(Demo, {
    title: "Progress & Slider",
    style: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Indexing sources"), /*#__PURE__*/React.createElement("span", {
    className: "sx-help"
  }, prog, "%")), /*#__PURE__*/React.createElement(Progress, {
    value: prog
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => setProg(Math.max(0, prog - 10))
  }, "\u221210"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => setProg(Math.min(100, prog + 10))
  }, "+10"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Confidence threshold"), /*#__PURE__*/React.createElement("span", {
    className: "sx-help"
  }, slider, "%")), /*#__PURE__*/React.createElement(Slider, {
    value: slider,
    onChange: setSlider
  }))), /*#__PURE__*/React.createElement(Demo, {
    title: "Skeleton (loading state)",
    style: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    style: {
      width: 40,
      height: 40,
      borderRadius: 9999
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    style: {
      height: 12,
      width: '40%'
    }
  }), /*#__PURE__*/React.createElement(Skeleton, {
    style: {
      height: 10,
      width: '60%'
    }
  }))), /*#__PURE__*/React.createElement(Skeleton, {
    style: {
      height: 120,
      width: '100%'
    }
  })));
};
const NavSection = () => /*#__PURE__*/React.createElement(Section, {
  id: "nav",
  eyebrow: "Navigation",
  title: "Tabs, breadcrumb, pagination"
}, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Tabs, {
  defaultValue: "overview"
}, /*#__PURE__*/React.createElement(TabsList, null, /*#__PURE__*/React.createElement(TabsTrigger, {
  value: "overview"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "house-simple",
  size: 14
}), " Overview"), /*#__PURE__*/React.createElement(TabsTrigger, {
  value: "requirements"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "list-checks",
  size: 14
}), " Requirements"), /*#__PURE__*/React.createElement(TabsTrigger, {
  value: "tests"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "flask",
  size: 14
}), " Tests"), /*#__PURE__*/React.createElement(TabsTrigger, {
  value: "activity"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "pulse",
  size: 14
}), " Activity")), /*#__PURE__*/React.createElement(TabsContent, {
  value: "overview"
}, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--sx-muted-foreground)',
    fontSize: 14,
    lineHeight: 1.6
  }
}, "Reg S-P \xA7248.30 governs the safeguarding of customer information by broker-dealers and investment advisers. Burst maintains 12 requirements and 38 acceptance criteria derived from this rule, last refreshed 2 minutes ago.")), /*#__PURE__*/React.createElement(TabsContent, {
  value: "requirements"
}, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--sx-muted-foreground)',
    fontSize: 14
  }
}, "12 requirements \u2014 switch tabs to see them.")), /*#__PURE__*/React.createElement(TabsContent, {
  value: "tests"
}, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--sx-muted-foreground)',
    fontSize: 14
  }
}, "4 test plans, last run yesterday.")), /*#__PURE__*/React.createElement(TabsContent, {
  value: "activity"
}, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--sx-muted-foreground)',
    fontSize: 14
  }
}, "Alex M. updated the AC list 12 minutes ago."))))), /*#__PURE__*/React.createElement(Demo, {
  title: "Breadcrumb"
}, /*#__PURE__*/React.createElement(Breadcrumb, {
  items: [{
    label: 'Home',
    href: '#'
  }, {
    label: 'Curated Artifacts',
    href: '#'
  }, {
    label: 'Reg S-P §248.30',
    current: true
  }]
})), /*#__PURE__*/React.createElement(Demo, {
  title: "Pagination"
}, /*#__PURE__*/React.createElement(PaginationDemo, null)));
const PaginationDemo = () => {
  const [page, setPage] = React.useState(2);
  return /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    total: 5,
    onChange: setPage
  });
};
const DataSection = () => /*#__PURE__*/React.createElement(Section, {
  id: "data",
  eyebrow: "Display",
  title: "Tables & badges"
}, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Curated artifacts"), /*#__PURE__*/React.createElement(CardDescription, null, "12 of 38 \u2014 last reviewed by A. Morales")), /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", {
  style: {
    textAlign: 'right'
  }
}, "Updated"))), /*#__PURE__*/React.createElement("tbody", null, [['REQ-104', 'Breach-notice timing must not exceed 72h', 'Requirement', 'A. Morales', 'approved', '2m ago'], ['STY-022', 'As a customer I receive notice within 72h', 'Story', 'J. Patel', 'in-review', '14m ago'], ['AC-318', 'Notice email contains all §248.30 elements', 'Acceptance', 'A. Morales', 'draft', '1h ago'], ['TST-091', 'Negative path — opt-out enforcement', 'Test', 'M. Chen', 'failing', 'yesterday']].map(r => /*#__PURE__*/React.createElement("tr", {
  key: r[0]
}, /*#__PURE__*/React.createElement("td", {
  style: {
    fontFamily: 'ui-monospace, monospace',
    fontSize: 13,
    color: 'var(--sx-muted-foreground)'
  }
}, r[0]), /*#__PURE__*/React.createElement("td", {
  style: {
    fontWeight: 500
  }
}, r[1]), /*#__PURE__*/React.createElement("td", null, r[2] === 'Requirement' && /*#__PURE__*/React.createElement(Badge, {
  variant: "default"
}, "Requirement"), r[2] === 'Story' && /*#__PURE__*/React.createElement(Badge, {
  variant: "success"
}, "Story"), r[2] === 'Acceptance' && /*#__PURE__*/React.createElement(Badge, {
  variant: "navy"
}, "Acceptance"), r[2] === 'Test' && /*#__PURE__*/React.createElement(Badge, {
  variant: "phoenix"
}, "Test")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8
  }
}, /*#__PURE__*/React.createElement(Avatar, {
  size: "sm",
  fallback: r[3].split(' ').map(p => p[0]).join('')
}), /*#__PURE__*/React.createElement("span", null, r[3]))), /*#__PURE__*/React.createElement("td", null, r[4] === 'approved' && /*#__PURE__*/React.createElement(Badge, {
  variant: "success"
}, "Approved"), r[4] === 'in-review' && /*#__PURE__*/React.createElement(Badge, {
  variant: "warning"
}, "In review"), r[4] === 'draft' && /*#__PURE__*/React.createElement(Badge, {
  variant: "outline"
}, "Draft"), r[4] === 'failing' && /*#__PURE__*/React.createElement(Badge, {
  variant: "destructive"
}, "Failing")), /*#__PURE__*/React.createElement("td", {
  style: {
    textAlign: 'right',
    color: 'var(--sx-muted-foreground)',
    fontSize: 13
  }
}, r[5])))))), /*#__PURE__*/React.createElement(Demo, {
  title: "Badges"
}, /*#__PURE__*/React.createElement(Badge, null, "Default"), /*#__PURE__*/React.createElement(Badge, {
  variant: "secondary"
}, "Secondary"), /*#__PURE__*/React.createElement(Badge, {
  variant: "outline"
}, "Outline"), /*#__PURE__*/React.createElement(Badge, {
  variant: "destructive"
}, "Destructive"), /*#__PURE__*/React.createElement(Badge, {
  variant: "success"
}, "Success"), /*#__PURE__*/React.createElement(Badge, {
  variant: "warning"
}, "Warning"), /*#__PURE__*/React.createElement(Badge, {
  variant: "navy"
}, "Navy"), /*#__PURE__*/React.createElement(Badge, {
  variant: "phoenix"
}, "Phoenix")), /*#__PURE__*/React.createElement(Demo, {
  title: "Avatars"
}, /*#__PURE__*/React.createElement(Avatar, {
  src: "../../assets/chat-avatar.png",
  alt: "A. Morales"
}), /*#__PURE__*/React.createElement(Avatar, {
  size: "sm",
  fallback: "JP"
}), /*#__PURE__*/React.createElement(Avatar, {
  fallback: "MC"
}), /*#__PURE__*/React.createElement(Avatar, {
  size: "lg",
  fallback: "AM"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex'
  }
}, ['AM', 'JP', 'MC', 'RT'].map((f, i) => /*#__PURE__*/React.createElement(Avatar, {
  key: i,
  fallback: f,
  style: {
    marginLeft: i === 0 ? 0 : -8,
    border: '2px solid #fff'
  }
})), /*#__PURE__*/React.createElement("span", {
  style: {
    marginLeft: -8,
    width: 40,
    height: 40,
    borderRadius: 9999,
    background: 'var(--sx-muted)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #fff',
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--sx-muted-foreground)'
  }
}, "+8"))));
const OverlaySection = () => {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(Section, {
    id: "overlays",
    eyebrow: "Layered",
    title: "Overlays & menus"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Dropdown menu"), /*#__PURE__*/React.createElement(CardDescription, null, "Click the trigger to open.")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16,
      minHeight: 220
    }
  }, /*#__PURE__*/React.createElement(DropdownMenu, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "outline"
    }, "Actions ", /*#__PURE__*/React.createElement(Icon, {
      name: "caret-down",
      size: 12
    }))
  }, /*#__PURE__*/React.createElement(MenuLabel, null, "Artifact actions"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "pencil-simple",
      size: 14
    }),
    shortcut: "\u2318E"
  }, "Edit"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "copy",
      size: 14
    }),
    shortcut: "\u2318D"
  }, "Duplicate"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "share-network",
      size: 14
    })
  }, "Share\u2026"), /*#__PURE__*/React.createElement(MenuSeparator, null), /*#__PURE__*/React.createElement(MenuLabel, null, "Status"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14
    })
  }, "Approve"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 14
    })
  }, "Mark in-review"), /*#__PURE__*/React.createElement(MenuSeparator, null), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 14
    }),
    shortcut: "\u232B",
    danger: true
  }, "Delete")), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Re-run curation"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-clockwise",
    size: 14
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Open in new tab"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-square-out",
    size: 14
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Dialog"), /*#__PURE__*/React.createElement(CardDescription, null, "Confirm destructive actions.")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      position: 'relative',
      minHeight: 220
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  }), " Delete artifact\u2026"), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onOpenChange: setOpen
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Delete REQ-104?"), /*#__PURE__*/React.createElement(DialogDescription, null, "This requirement is linked to 3 acceptance criteria and 1 test. Deleting it will sever those links \u2014 this can't be undone."), /*#__PURE__*/React.createElement(DialogFooter, null, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setOpen(false)
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    onClick: () => setOpen(false)
  }, "Delete requirement")))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Command palette"), /*#__PURE__*/React.createElement(CardDescription, null, "Press \u2318K to summon \u2014 try typing \"export\".")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement(Command, {
    groups: [{
      label: 'Suggestions',
      items: [{
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "sparkle",
          size: 14
        }),
        label: 'Start new curation',
        shortcut: '⌘N'
      }, {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "magnifying-glass",
          size: 14
        }),
        label: 'Search artifacts',
        shortcut: '/'
      }, {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "download-simple",
          size: 14
        }),
        label: 'Export to Confluence'
      }]
    }, {
      label: 'Recent',
      items: [{
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "file-text",
          size: 14
        }),
        label: 'Reg S-P §248.30 — Breach notice'
      }, {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "file-text",
          size: 14
        }),
        label: 'AML Model Rule — Controls'
      }]
    }]
  }))));
};
const CalendarSection = () => /*#__PURE__*/React.createElement(Section, {
  id: "calendar",
  eyebrow: "Date",
  title: "Calendar"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap'
  }
}, /*#__PURE__*/React.createElement(Calendar, {
  year: 2026,
  month: 4,
  selected: 14
}), /*#__PURE__*/React.createElement(Card, {
  style: {
    flex: 1,
    minWidth: 280
  }
}, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Schedule a review"), /*#__PURE__*/React.createElement(CardDescription, null, "Pick a day to send the artifact to reviewers.")), /*#__PURE__*/React.createElement(CardContent, {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }
}, /*#__PURE__*/React.createElement(Field, {
  label: "Reviewer"
}, /*#__PURE__*/React.createElement(Select, {
  value: "am",
  onValueChange: () => {},
  options: [{
    value: 'am',
    label: 'A. Morales (Compliance)'
  }, {
    value: 'jp',
    label: 'J. Patel (Engineering)'
  }, {
    value: 'mc',
    label: 'M. Chen (QA)'
  }]
})), /*#__PURE__*/React.createElement(Field, {
  label: "Selected date"
}, /*#__PURE__*/React.createElement(Input, {
  defaultValue: "May 14, 2026"
})), /*#__PURE__*/React.createElement(Button, null, "Schedule review")))));

// ---------- Page shell ----------
const sections = [{
  id: 'buttons',
  label: 'Button'
}, {
  id: 'forms',
  label: 'Forms'
}, {
  id: 'feedback',
  label: 'Feedback'
}, {
  id: 'nav',
  label: 'Navigation'
}, {
  id: 'data',
  label: 'Data'
}, {
  id: 'overlays',
  label: 'Overlays'
}, {
  id: 'calendar',
  label: 'Calendar'
}];
const Showcase = () => {
  const [active, setActive] = React.useState('buttons');
  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: '-40% 0px -50% 0px'
    });
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: '#fff',
      color: 'var(--sx-foreground)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--sx-border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 32px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    width: 26,
    height: 26,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '-0.01em'
    }
  }, "Burst"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      padding: '2px 8px',
      borderRadius: 9999,
      background: 'var(--sx-muted)',
      color: 'var(--sx-muted-foreground)',
      fontWeight: 500
    }
  }, "shadcn kit")), /*#__PURE__*/React.createElement("nav", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book-open",
    size: 14
  }), " Docs"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "github-logo",
    size: 14
  }), " GitHub"), /*#__PURE__*/React.createElement(Separator, {
    orientation: "vertical",
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "sm",
    fallback: "AM"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 72,
      alignSelf: 'start',
      height: 'calc(100vh - 80px)',
      overflowY: 'auto',
      paddingTop: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--sx-muted-foreground)',
      marginBottom: 10
    }
  }, "Components"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, sections.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: `#${s.id}`,
    style: {
      padding: '6px 10px',
      borderRadius: 6,
      textDecoration: 'none',
      fontSize: 14,
      fontWeight: active === s.id ? 600 : 500,
      color: active === s.id ? 'var(--sx-foreground)' : 'var(--sx-muted-foreground)',
      background: active === s.id ? 'var(--sx-accent)' : 'transparent',
      borderLeft: `2px solid ${active === s.id ? 'var(--sx-primary)' : 'transparent'}`,
      paddingLeft: 12
    }
  }, s.label))), /*#__PURE__*/React.createElement(Separator, {
    style: {
      margin: '20px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--sx-muted-foreground)',
      marginBottom: 10
    }
  }, "Tokens"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontSize: 12,
      color: 'var(--sx-muted-foreground)'
    }
  }, /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "primary",
    value: "var(--primary)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "secondary",
    value: "var(--secondary)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "tertiary",
    value: "var(--tertiary)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "destructive",
    value: "var(--destructive)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "success",
    value: "var(--success)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "muted",
    value: "var(--muted-lightest)",
    border: true
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      paddingTop: 36,
      paddingBottom: 120,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: 'UI Kits',
      href: '#'
    }, {
      label: 'Burst',
      href: '#'
    }, {
      label: 'Shadcn edition',
      current: true
    }]
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 32,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '8px 0 12px'
    }
  }, "Burst \xD7 Shadcn"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--sx-muted-foreground)',
      fontSize: 15,
      lineHeight: 1.6,
      maxWidth: 640
    }
  }, "A drop-in component library that pairs the structural restraint of Shadcn \u2014 subtle borders, modest radii, quiet shadows \u2014 with Burst's existing color palette (Phoenix cyan, deep navy, the Burst gradient). Every component below uses tokens straight from ", /*#__PURE__*/React.createElement("code", {
    style: {
      background: 'var(--sx-muted)',
      padding: '1px 6px',
      borderRadius: 4,
      fontSize: 13
    }
  }, "colors_and_type.css"), "."), /*#__PURE__*/React.createElement(ButtonsSection, null), /*#__PURE__*/React.createElement(FormSection, null), /*#__PURE__*/React.createElement(FeedbackSection, null), /*#__PURE__*/React.createElement(NavSection, null), /*#__PURE__*/React.createElement(DataSection, null), /*#__PURE__*/React.createElement(OverlaySection, null), /*#__PURE__*/React.createElement(CalendarSection, null))));
};
const TokenSwatch = ({
  name,
  value,
  border
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 14,
    height: 14,
    borderRadius: 4,
    background: value,
    border: border ? '1px solid var(--sx-border)' : 0,
    flex: 'none'
  }
}), /*#__PURE__*/React.createElement("code", {
  style: {
    fontFamily: 'ui-monospace, monospace',
    fontSize: 11
  }
}, "--", name));
Object.assign(window, {
  Showcase
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/burst_shadcn/showcase.jsx", error: String((e && e.message) || e) }); }

// ui_kits/burst_shadcn/showcase.standalone.jsx
try { (() => {
/* global React, cn, Icon, Button, Input, Textarea, Label, Field, Badge,
   Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
   Separator, Alert, Avatar, Checkbox, Radio, Switch,
   Tabs, TabsList, TabsTrigger, TabsContent,
   Table, Progress, Slider, Skeleton,
   Breadcrumb, Pagination, Tooltip, Toast,
   DropdownMenu, MenuLabel, MenuItem, MenuSeparator,
   Select, Dialog, DialogTitle, DialogDescription, DialogFooter,
   Command, Calendar */

// ---------- Layout helpers ----------
const Section = ({
  id,
  title,
  eyebrow,
  children
}) => /*#__PURE__*/React.createElement("section", {
  id: id,
  style: {
    scrollMarginTop: 80,
    padding: '32px 0'
  }
}, /*#__PURE__*/React.createElement("header", {
  style: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }
}, eyebrow && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--sx-muted-foreground)'
  }
}, eyebrow), /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: 'var(--sx-foreground)'
  }
}, title)), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }
}, children));
const Demo = ({
  title,
  children,
  style
}) => /*#__PURE__*/React.createElement(Card, null, title && /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, title)), /*#__PURE__*/React.createElement(CardContent, {
  style: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    ...style
  }
}, children));

// ---------- Sections ----------
const ButtonsSection = () => /*#__PURE__*/React.createElement(Section, {
  id: "buttons",
  eyebrow: "Action",
  title: "Button"
}, /*#__PURE__*/React.createElement(Demo, {
  title: "Variants"
}, /*#__PURE__*/React.createElement(Button, null, "Default"), /*#__PURE__*/React.createElement(Button, {
  variant: "secondary"
}, "Secondary"), /*#__PURE__*/React.createElement(Button, {
  variant: "outline"
}, "Outline"), /*#__PURE__*/React.createElement(Button, {
  variant: "ghost"
}, "Ghost"), /*#__PURE__*/React.createElement(Button, {
  variant: "link"
}, "Link"), /*#__PURE__*/React.createElement(Button, {
  variant: "destructive"
}, "Destructive"), /*#__PURE__*/React.createElement(Button, {
  variant: "navy"
}, "Navy"), /*#__PURE__*/React.createElement(Button, {
  variant: "phoenix"
}, "Phoenix")), /*#__PURE__*/React.createElement(Demo, {
  title: "Sizes"
}, /*#__PURE__*/React.createElement(Button, {
  size: "sm"
}, "Small"), /*#__PURE__*/React.createElement(Button, {
  size: "md"
}, "Default"), /*#__PURE__*/React.createElement(Button, {
  size: "lg"
}, "Large"), /*#__PURE__*/React.createElement(Button, {
  size: "icon",
  variant: "outline"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "gear",
  size: 16
}))), /*#__PURE__*/React.createElement(Demo, {
  title: "With icons"
}, /*#__PURE__*/React.createElement(Button, null, /*#__PURE__*/React.createElement(Icon, {
  name: "plus",
  size: 14
}), " New artifact"), /*#__PURE__*/React.createElement(Button, {
  variant: "outline"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "download-simple",
  size: 14
}), " Export"), /*#__PURE__*/React.createElement(Button, {
  variant: "secondary"
}, "Continue ", /*#__PURE__*/React.createElement(Icon, {
  name: "arrow-right",
  size: 14
})), /*#__PURE__*/React.createElement(Button, {
  variant: "destructive"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "trash",
  size: 14
}), " Delete"), /*#__PURE__*/React.createElement(Button, {
  disabled: true
}, "Disabled")));
const FormSection = () => {
  const [pwd, setPwd] = React.useState('');
  const [sel, setSel] = React.useState('reg-sp');
  const [checked, setChecked] = React.useState(true);
  const [sw, setSw] = React.useState(true);
  return /*#__PURE__*/React.createElement(Section, {
    id: "forms",
    eyebrow: "Inputs",
    title: "Form controls"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Sign in"), /*#__PURE__*/React.createElement(CardDescription, null, "Use your Phoenix Burst credentials to continue.")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    htmlFor: "email"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "email",
    type: "email",
    placeholder: "alex@phoenix.co",
    defaultValue: "alex@phoenix.co"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Password",
    htmlFor: "pwd",
    hint: "At least 12 characters",
    error: pwd.length > 0 && pwd.length < 6 ? 'Password is too short.' : null
  }, /*#__PURE__*/React.createElement(Input, {
    id: "pwd",
    type: "password",
    value: pwd,
    onChange: e => setPwd(e.target.value),
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    invalid: pwd.length > 0 && pwd.length < 6
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    id: "remember",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Label, {
    htmlFor: "remember"
  }, "Remember this device for 30 days"))), /*#__PURE__*/React.createElement(CardFooter, {
    style: {
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, "Forgot password?"), /*#__PURE__*/React.createElement(Button, null, "Sign in"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Curation settings"), /*#__PURE__*/React.createElement(CardDescription, null, "Configure how Burst generates artifacts for this source.")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Source",
    htmlFor: "src"
  }, /*#__PURE__*/React.createElement(Select, {
    value: sel,
    onValueChange: setSel,
    options: [{
      value: 'reg-sp',
      label: 'Reg S-P §248.30'
    }, {
      value: 'aml',
      label: 'AML Model Rule'
    }, {
      value: 'mifid',
      label: 'MiFID II — Suitability'
    }, {
      value: 'sox',
      label: 'SOX §404 controls'
    }]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Notes",
    htmlFor: "notes",
    hint: "Optional \u2014 visible to reviewers"
  }, /*#__PURE__*/React.createElement(Textarea, {
    id: "notes",
    placeholder: "Outline the scope of this curation\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Generate"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['Requirements', true], ['User stories', true], ['Acceptance criteria', false], ['Tests', false]].map(([l, def], i) => /*#__PURE__*/React.createElement("label", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: def
  }), /*#__PURE__*/React.createElement("span", null, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "Auto-notify reviewers"), /*#__PURE__*/React.createElement("p", {
    className: "sx-help",
    style: {
      marginTop: 2
    }
  }, "Send a Slack DM when the run completes.")), /*#__PURE__*/React.createElement(Switch, {
    checked: sw,
    onCheckedChange: setSw
  }))), /*#__PURE__*/React.createElement(CardFooter, {
    style: {
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, null, "Save changes")))), /*#__PURE__*/React.createElement(Demo, {
    title: "Other inputs"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Search"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "magnifying-glass",
    size: 14,
    color: "var(--muted-dark)",
    style: {
      position: 'absolute',
      left: 10,
      top: 11
    }
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search artifacts\u2026",
    style: {
      paddingLeft: 32
    }
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Disabled"
  }, /*#__PURE__*/React.createElement(Input, {
    disabled: true,
    placeholder: "Disabled input"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Invalid",
    error: "This value is required."
  }, /*#__PURE__*/React.createElement(Input, {
    invalid: true,
    placeholder: "Required"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Visibility"), ['Private', 'Team', 'Org'].map((l, i) => /*#__PURE__*/React.createElement("label", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "visibility",
    defaultChecked: i === 1
  }), l)))));
};
const FeedbackSection = () => {
  const [prog, setProg] = React.useState(64);
  const [slider, setSlider] = React.useState(38);
  return /*#__PURE__*/React.createElement(Section, {
    id: "feedback",
    eyebrow: "Status",
    title: "Feedback"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    title: "Heads up",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "info",
      size: 18
    })
  }, "A new version of Reg S-P \xA7248.30 was published 4 minutes ago. Re-run the curation to incorporate the changes."), /*#__PURE__*/React.createElement(Alert, {
    variant: "destructive",
    title: "Connection lost",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "warning",
      size: 18
    })
  }, "We couldn't reach the regulatory source. Saved drafts are still available locally."), /*#__PURE__*/React.createElement(Alert, {
    variant: "success",
    title: "Curation complete",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      size: 18
    })
  }, "12 requirements and 38 acceptance criteria are ready for review."), /*#__PURE__*/React.createElement(Toast, {
    title: "Artifact exported",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "Undo")
  }, "Reg-SP-Breach-Notice.docx was saved to your downloads.")), /*#__PURE__*/React.createElement(Demo, {
    title: "Progress & Slider",
    style: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Indexing sources"), /*#__PURE__*/React.createElement("span", {
    className: "sx-help"
  }, prog, "%")), /*#__PURE__*/React.createElement(Progress, {
    value: prog
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => setProg(Math.max(0, prog - 10))
  }, "\u221210"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => setProg(Math.min(100, prog + 10))
  }, "+10"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Label, null, "Confidence threshold"), /*#__PURE__*/React.createElement("span", {
    className: "sx-help"
  }, slider, "%")), /*#__PURE__*/React.createElement(Slider, {
    value: slider,
    onChange: setSlider
  }))), /*#__PURE__*/React.createElement(Demo, {
    title: "Skeleton (loading state)",
    style: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    style: {
      width: 40,
      height: 40,
      borderRadius: 9999
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    style: {
      height: 12,
      width: '40%'
    }
  }), /*#__PURE__*/React.createElement(Skeleton, {
    style: {
      height: 10,
      width: '60%'
    }
  }))), /*#__PURE__*/React.createElement(Skeleton, {
    style: {
      height: 120,
      width: '100%'
    }
  })));
};
const NavSection = () => /*#__PURE__*/React.createElement(Section, {
  id: "nav",
  eyebrow: "Navigation",
  title: "Tabs, breadcrumb, pagination"
}, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement(Tabs, {
  defaultValue: "overview"
}, /*#__PURE__*/React.createElement(TabsList, null, /*#__PURE__*/React.createElement(TabsTrigger, {
  value: "overview"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "house-simple",
  size: 14
}), " Overview"), /*#__PURE__*/React.createElement(TabsTrigger, {
  value: "requirements"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "list-checks",
  size: 14
}), " Requirements"), /*#__PURE__*/React.createElement(TabsTrigger, {
  value: "tests"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "flask",
  size: 14
}), " Tests"), /*#__PURE__*/React.createElement(TabsTrigger, {
  value: "activity"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "pulse",
  size: 14
}), " Activity")), /*#__PURE__*/React.createElement(TabsContent, {
  value: "overview"
}, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--sx-muted-foreground)',
    fontSize: 14,
    lineHeight: 1.6
  }
}, "Reg S-P \xA7248.30 governs the safeguarding of customer information by broker-dealers and investment advisers. Burst maintains 12 requirements and 38 acceptance criteria derived from this rule, last refreshed 2 minutes ago.")), /*#__PURE__*/React.createElement(TabsContent, {
  value: "requirements"
}, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--sx-muted-foreground)',
    fontSize: 14
  }
}, "12 requirements \u2014 switch tabs to see them.")), /*#__PURE__*/React.createElement(TabsContent, {
  value: "tests"
}, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--sx-muted-foreground)',
    fontSize: 14
  }
}, "4 test plans, last run yesterday.")), /*#__PURE__*/React.createElement(TabsContent, {
  value: "activity"
}, /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    color: 'var(--sx-muted-foreground)',
    fontSize: 14
  }
}, "Alex M. updated the AC list 12 minutes ago."))))), /*#__PURE__*/React.createElement(Demo, {
  title: "Breadcrumb"
}, /*#__PURE__*/React.createElement(Breadcrumb, {
  items: [{
    label: 'Home',
    href: '#'
  }, {
    label: 'Curated Artifacts',
    href: '#'
  }, {
    label: 'Reg S-P §248.30',
    current: true
  }]
})), /*#__PURE__*/React.createElement(Demo, {
  title: "Pagination"
}, /*#__PURE__*/React.createElement(PaginationDemo, null)));
const PaginationDemo = () => {
  const [page, setPage] = React.useState(2);
  return /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    total: 5,
    onChange: setPage
  });
};
const DataSection = () => /*#__PURE__*/React.createElement(Section, {
  id: "data",
  eyebrow: "Display",
  title: "Tables & badges"
}, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Curated artifacts"), /*#__PURE__*/React.createElement(CardDescription, null, "12 of 38 \u2014 last reviewed by A. Morales")), /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Title"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", {
  style: {
    textAlign: 'right'
  }
}, "Updated"))), /*#__PURE__*/React.createElement("tbody", null, [['REQ-104', 'Breach-notice timing must not exceed 72h', 'Requirement', 'A. Morales', 'approved', '2m ago'], ['STY-022', 'As a customer I receive notice within 72h', 'Story', 'J. Patel', 'in-review', '14m ago'], ['AC-318', 'Notice email contains all §248.30 elements', 'Acceptance', 'A. Morales', 'draft', '1h ago'], ['TST-091', 'Negative path — opt-out enforcement', 'Test', 'M. Chen', 'failing', 'yesterday']].map(r => /*#__PURE__*/React.createElement("tr", {
  key: r[0]
}, /*#__PURE__*/React.createElement("td", {
  style: {
    fontFamily: 'ui-monospace, monospace',
    fontSize: 13,
    color: 'var(--sx-muted-foreground)'
  }
}, r[0]), /*#__PURE__*/React.createElement("td", {
  style: {
    fontWeight: 500
  }
}, r[1]), /*#__PURE__*/React.createElement("td", null, r[2] === 'Requirement' && /*#__PURE__*/React.createElement(Badge, {
  variant: "default"
}, "Requirement"), r[2] === 'Story' && /*#__PURE__*/React.createElement(Badge, {
  variant: "success"
}, "Story"), r[2] === 'Acceptance' && /*#__PURE__*/React.createElement(Badge, {
  variant: "navy"
}, "Acceptance"), r[2] === 'Test' && /*#__PURE__*/React.createElement(Badge, {
  variant: "phoenix"
}, "Test")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8
  }
}, /*#__PURE__*/React.createElement(Avatar, {
  size: "sm",
  fallback: r[3].split(' ').map(p => p[0]).join('')
}), /*#__PURE__*/React.createElement("span", null, r[3]))), /*#__PURE__*/React.createElement("td", null, r[4] === 'approved' && /*#__PURE__*/React.createElement(Badge, {
  variant: "success"
}, "Approved"), r[4] === 'in-review' && /*#__PURE__*/React.createElement(Badge, {
  variant: "warning"
}, "In review"), r[4] === 'draft' && /*#__PURE__*/React.createElement(Badge, {
  variant: "outline"
}, "Draft"), r[4] === 'failing' && /*#__PURE__*/React.createElement(Badge, {
  variant: "destructive"
}, "Failing")), /*#__PURE__*/React.createElement("td", {
  style: {
    textAlign: 'right',
    color: 'var(--sx-muted-foreground)',
    fontSize: 13
  }
}, r[5])))))), /*#__PURE__*/React.createElement(Demo, {
  title: "Badges"
}, /*#__PURE__*/React.createElement(Badge, null, "Default"), /*#__PURE__*/React.createElement(Badge, {
  variant: "secondary"
}, "Secondary"), /*#__PURE__*/React.createElement(Badge, {
  variant: "outline"
}, "Outline"), /*#__PURE__*/React.createElement(Badge, {
  variant: "destructive"
}, "Destructive"), /*#__PURE__*/React.createElement(Badge, {
  variant: "success"
}, "Success"), /*#__PURE__*/React.createElement(Badge, {
  variant: "warning"
}, "Warning"), /*#__PURE__*/React.createElement(Badge, {
  variant: "navy"
}, "Navy"), /*#__PURE__*/React.createElement(Badge, {
  variant: "phoenix"
}, "Phoenix")), /*#__PURE__*/React.createElement(Demo, {
  title: "Avatars"
}, /*#__PURE__*/React.createElement(Avatar, {
  src: window.__resources ? window.__resources.chatAvatar : "../../assets/chat-avatar.png",
  alt: "A. Morales"
}), /*#__PURE__*/React.createElement(Avatar, {
  size: "sm",
  fallback: "JP"
}), /*#__PURE__*/React.createElement(Avatar, {
  fallback: "MC"
}), /*#__PURE__*/React.createElement(Avatar, {
  size: "lg",
  fallback: "AM"
}), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex'
  }
}, ['AM', 'JP', 'MC', 'RT'].map((f, i) => /*#__PURE__*/React.createElement(Avatar, {
  key: i,
  fallback: f,
  style: {
    marginLeft: i === 0 ? 0 : -8,
    border: '2px solid #fff'
  }
})), /*#__PURE__*/React.createElement("span", {
  style: {
    marginLeft: -8,
    width: 40,
    height: 40,
    borderRadius: 9999,
    background: 'var(--sx-muted)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #fff',
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--sx-muted-foreground)'
  }
}, "+8"))));
const OverlaySection = () => {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement(Section, {
    id: "overlays",
    eyebrow: "Layered",
    title: "Overlays & menus"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Dropdown menu"), /*#__PURE__*/React.createElement(CardDescription, null, "Click the trigger to open.")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16,
      minHeight: 220
    }
  }, /*#__PURE__*/React.createElement(DropdownMenu, {
    trigger: /*#__PURE__*/React.createElement(Button, {
      variant: "outline"
    }, "Actions ", /*#__PURE__*/React.createElement(Icon, {
      name: "caret-down",
      size: 12
    }))
  }, /*#__PURE__*/React.createElement(MenuLabel, null, "Artifact actions"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "pencil-simple",
      size: 14
    }),
    shortcut: "\u2318E"
  }, "Edit"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "copy",
      size: 14
    }),
    shortcut: "\u2318D"
  }, "Duplicate"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "share-network",
      size: 14
    })
  }, "Share\u2026"), /*#__PURE__*/React.createElement(MenuSeparator, null), /*#__PURE__*/React.createElement(MenuLabel, null, "Status"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14
    })
  }, "Approve"), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 14
    })
  }, "Mark in-review"), /*#__PURE__*/React.createElement(MenuSeparator, null), /*#__PURE__*/React.createElement(MenuItem, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 14
    }),
    shortcut: "\u232B",
    danger: true
  }, "Delete")), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Re-run curation"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-clockwise",
    size: 14
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Open in new tab"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-square-out",
    size: 14
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Dialog"), /*#__PURE__*/React.createElement(CardDescription, null, "Confirm destructive actions.")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      position: 'relative',
      minHeight: 220
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  }), " Delete artifact\u2026"), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onOpenChange: setOpen
  }, /*#__PURE__*/React.createElement(DialogTitle, null, "Delete REQ-104?"), /*#__PURE__*/React.createElement(DialogDescription, null, "This requirement is linked to 3 acceptance criteria and 1 test. Deleting it will sever those links \u2014 this can't be undone."), /*#__PURE__*/React.createElement(DialogFooter, null, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setOpen(false)
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    onClick: () => setOpen(false)
  }, "Delete requirement")))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Command palette"), /*#__PURE__*/React.createElement(CardDescription, null, "Press \u2318K to summon \u2014 try typing \"export\".")), /*#__PURE__*/React.createElement(CardContent, {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement(Command, {
    groups: [{
      label: 'Suggestions',
      items: [{
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "sparkle",
          size: 14
        }),
        label: 'Start new curation',
        shortcut: '⌘N'
      }, {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "magnifying-glass",
          size: 14
        }),
        label: 'Search artifacts',
        shortcut: '/'
      }, {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "download-simple",
          size: 14
        }),
        label: 'Export to Confluence'
      }]
    }, {
      label: 'Recent',
      items: [{
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "file-text",
          size: 14
        }),
        label: 'Reg S-P §248.30 — Breach notice'
      }, {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "file-text",
          size: 14
        }),
        label: 'AML Model Rule — Controls'
      }]
    }]
  }))));
};
const CalendarSection = () => /*#__PURE__*/React.createElement(Section, {
  id: "calendar",
  eyebrow: "Date",
  title: "Calendar"
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap'
  }
}, /*#__PURE__*/React.createElement(Calendar, {
  year: 2026,
  month: 4,
  selected: 14
}), /*#__PURE__*/React.createElement(Card, {
  style: {
    flex: 1,
    minWidth: 280
  }
}, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, "Schedule a review"), /*#__PURE__*/React.createElement(CardDescription, null, "Pick a day to send the artifact to reviewers.")), /*#__PURE__*/React.createElement(CardContent, {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }
}, /*#__PURE__*/React.createElement(Field, {
  label: "Reviewer"
}, /*#__PURE__*/React.createElement(Select, {
  value: "am",
  onValueChange: () => {},
  options: [{
    value: 'am',
    label: 'A. Morales (Compliance)'
  }, {
    value: 'jp',
    label: 'J. Patel (Engineering)'
  }, {
    value: 'mc',
    label: 'M. Chen (QA)'
  }]
})), /*#__PURE__*/React.createElement(Field, {
  label: "Selected date"
}, /*#__PURE__*/React.createElement(Input, {
  defaultValue: "May 14, 2026"
})), /*#__PURE__*/React.createElement(Button, null, "Schedule review")))));

// ---------- Page shell ----------
const sections = [{
  id: 'buttons',
  label: 'Button'
}, {
  id: 'forms',
  label: 'Forms'
}, {
  id: 'feedback',
  label: 'Feedback'
}, {
  id: 'nav',
  label: 'Navigation'
}, {
  id: 'data',
  label: 'Data'
}, {
  id: 'overlays',
  label: 'Overlays'
}, {
  id: 'calendar',
  label: 'Calendar'
}];
const Showcase = () => {
  const [active, setActive] = React.useState('buttons');
  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: '-40% 0px -50% 0px'
    });
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: '#fff',
      color: 'var(--sx-foreground)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--sx-border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 32px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources ? window.__resources.logo : "../../assets/logo.png",
    width: 26,
    height: 26,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '-0.01em'
    }
  }, "Burst"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      padding: '2px 8px',
      borderRadius: 9999,
      background: 'var(--sx-muted)',
      color: 'var(--sx-muted-foreground)',
      fontWeight: 500
    }
  }, "shadcn kit")), /*#__PURE__*/React.createElement("nav", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book-open",
    size: 14
  }), " Docs"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "github-logo",
    size: 14
  }), " GitHub"), /*#__PURE__*/React.createElement(Separator, {
    orientation: "vertical",
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement(Avatar, {
    size: "sm",
    fallback: "AM"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 72,
      alignSelf: 'start',
      height: 'calc(100vh - 80px)',
      overflowY: 'auto',
      paddingTop: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--sx-muted-foreground)',
      marginBottom: 10
    }
  }, "Components"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, sections.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: `#${s.id}`,
    style: {
      padding: '6px 10px',
      borderRadius: 6,
      textDecoration: 'none',
      fontSize: 14,
      fontWeight: active === s.id ? 600 : 500,
      color: active === s.id ? 'var(--sx-foreground)' : 'var(--sx-muted-foreground)',
      background: active === s.id ? 'var(--sx-accent)' : 'transparent',
      borderLeft: `2px solid ${active === s.id ? 'var(--sx-primary)' : 'transparent'}`,
      paddingLeft: 12
    }
  }, s.label))), /*#__PURE__*/React.createElement(Separator, {
    style: {
      margin: '20px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--sx-muted-foreground)',
      marginBottom: 10
    }
  }, "Tokens"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontSize: 12,
      color: 'var(--sx-muted-foreground)'
    }
  }, /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "primary",
    value: "var(--primary)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "secondary",
    value: "var(--secondary)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "tertiary",
    value: "var(--tertiary)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "destructive",
    value: "var(--destructive)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "success",
    value: "var(--success)"
  }), /*#__PURE__*/React.createElement(TokenSwatch, {
    name: "muted",
    value: "var(--muted-lightest)",
    border: true
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      paddingTop: 36,
      paddingBottom: 120,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: [{
      label: 'UI Kits',
      href: '#'
    }, {
      label: 'Burst',
      href: '#'
    }, {
      label: 'Shadcn edition',
      current: true
    }]
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 32,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      margin: '8px 0 12px'
    }
  }, "Burst \xD7 Shadcn"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--sx-muted-foreground)',
      fontSize: 15,
      lineHeight: 1.6,
      maxWidth: 640
    }
  }, "A drop-in component library that pairs the structural restraint of Shadcn \u2014 subtle borders, modest radii, quiet shadows \u2014 with Burst's existing color palette (Phoenix cyan, deep navy, the Burst gradient). Every component below uses tokens straight from ", /*#__PURE__*/React.createElement("code", {
    style: {
      background: 'var(--sx-muted)',
      padding: '1px 6px',
      borderRadius: 4,
      fontSize: 13
    }
  }, "colors_and_type.css"), "."), /*#__PURE__*/React.createElement(ButtonsSection, null), /*#__PURE__*/React.createElement(FormSection, null), /*#__PURE__*/React.createElement(FeedbackSection, null), /*#__PURE__*/React.createElement(NavSection, null), /*#__PURE__*/React.createElement(DataSection, null), /*#__PURE__*/React.createElement(OverlaySection, null), /*#__PURE__*/React.createElement(CalendarSection, null))));
};
const TokenSwatch = ({
  name,
  value,
  border
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 14,
    height: 14,
    borderRadius: 4,
    background: value,
    border: border ? '1px solid var(--sx-border)' : 0,
    flex: 'none'
  }
}), /*#__PURE__*/React.createElement("code", {
  style: {
    fontFamily: 'ui-monospace, monospace',
    fontSize: 11
  }
}, "--", name));
Object.assign(window, {
  Showcase
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/burst_shadcn/showcase.standalone.jsx", error: String((e && e.message) || e) }); }

})();
