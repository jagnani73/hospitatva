export interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
}

const button = ({ children, onClick }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="bg-gradient-to-r from-patient-accent to-green-600 px-6 py-3 text-white"
		>
			{children}
		</button>
	);
};

export default button;
