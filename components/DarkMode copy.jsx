import React from 'react';
import useDarkMode from '@theowenyoung/use-dark-mode';

const DarkMode = ({ onDataChange }) => {
	const darkMode = useDarkMode(false);
	return (
		<div className='dark-mode-toggle'>
			{darkMode.value && (
				<button
					onClick={() => {
						darkMode.disable;
						darkMode.toggle();
						onDataChange(darkMode.value);
					}}
					type='button'
					aria-label='Color Mode'
					className='modeButton'
				>
					<span>☀</span>
				</button>
			)}

			{!darkMode.value && (
				<button
					onClick={() => {
						darkMode.enable;
						darkMode.toggle();
						onDataChange(darkMode.value);
					}}
					type='button'
					aria-label='Color Mode'
					className='modeButton'
				>
					<span>☾</span>
					
				</button>
			)}
		</div>
	);
};

export default DarkMode;
