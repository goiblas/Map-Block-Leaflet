const Listbox = ({ children, ...props }) => (
  <div role="listbox" className="mbl-listbox" {...props}>
    <ul className="mbl-listbox-list">{children}</ul>
  </div>
);

export const ListItem = ({ children, onClick, selected, id }) => (
  <li className="mbl-listbox-item" role="option" aria-selected={selected} onClick={onClick} id={id}>
    {children}
  </li>
);

export default Listbox;
