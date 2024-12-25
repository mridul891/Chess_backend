const Button = ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => {
    return (
      <div
        onClick={onClick}
        className="bg-[#A0CF5F] text-white  font-bold w-[10rem] px-4 py-3 rounded text-2xl"
      >
        {children}
      </div>
    );
  };
  
  export default Button;
  