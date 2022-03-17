import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useDisableScroll as DisableScroll } from "../../../hooks";
import { ReactPortal } from "../";

import styles from "./modal.module.scss";
import { ModalProps } from "../../../utils/interfaces/shared";

const Modal = ({
	children,
	titleElement,
	closeIcon,
	isOpen,
	onClose,
	enterAnimation = "zoom-in",
	exitAnimation = "zoom-in",
}: ModalProps) => {
	const modalRef = useRef<HTMLElement>(null);

	const keyDownHandler: React.KeyboardEventHandler<HTMLElement> = (e) => {
		if (e.keyCode === 27) onClose();
	};

	return (
		<ReactPortal>
			<CSSTransition
				in={isOpen}
				nodeRef={modalRef}
				timeout={250}
				classNames={{
					enter: [styles.enter, styles[enterAnimation]].join(" "),
					enterActive: styles.enterActive,
					exit: [styles.exit, styles[exitAnimation]].join(" "),
					exitActive: styles.exitActive,
				}}
				unmountOnExit
				onEnter={() => modalRef.current?.focus()}
			>
				<>
					<DisableScroll />
					<section
						onKeyDown={keyDownHandler}
						ref={modalRef}
						tabIndex={0}
						className={styles.modal}
					>
						<div tabIndex={-1} className={styles.backdrop} onClick={onClose} />

						<section className={styles.content}>
							<header className={styles.header}>
								{titleElement}
								<button className={styles.closeButton} onClick={onClose}>
									{closeIcon ? (
										closeIcon
									) : (
										<svg
											stroke="currentColor"
											fill="currentColor"
											stroke-width="0"
											viewBox="0 0 24 24"
											height="1em"
											width="1em"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path fill="none" d="M0 0h24v24H0z"></path>
											<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
										</svg>
									)}
								</button>
							</header>

							<div className={styles.body}>{children}</div>
						</section>
					</section>
				</>
			</CSSTransition>
		</ReactPortal>
	);
};

export default Modal;
