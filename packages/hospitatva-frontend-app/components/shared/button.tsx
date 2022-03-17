export interface ButtonProps {
	children: React.ReactNode;
}

const button = ({ children }: ButtonProps) => {
	return (
		<button className="bg-gradient-to-r from-patient-accent to-green-600">
			{children}
		</button>
	);
};

export default button;
