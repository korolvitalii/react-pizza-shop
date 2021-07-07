import classNames from 'classnames';

const Button = (props) => {
  const { onClick, className, outline, children } = props;
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
};

export default Button;
