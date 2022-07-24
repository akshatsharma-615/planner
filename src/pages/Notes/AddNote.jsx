import React, { useState } from "react";
import Button from "../../components/Button/Button";
import IconButton from "../../components/Button/IconButton";
import Input, { TextArea } from "../../components/Input/Input";
import Dialog from "../../Layout/Dialog/Dialog";
import Row, { Col } from "../../Layout/Responsive";
import { colors, notesBackgrounds } from "../../utils";

const AddNote = ({ close }) => {
	const [newNote, setNewNote] = useState({
		title: "",
		content: "",
		color: "indigo",
		image: "",
		archived: false,
		trashed: false,
	});
	const [openColorBox, setOpenColorBox] = useState(false);
	const [openImageBox, setOpenImageBox] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewNote((p) => ({ ...p, [name]: value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(newNote);
		setNewNote({
			title: "",
			content: "",
			color: "indigo",
			image: "",
			archived: false,
			trashed: false,
		});
	};
	const handleReset = (e) => {
		e.preventDefault();
		setNewNote({
			title: "",
			content: "",
			color: "indigo",
			image: "",
			archived: false,
			trashed: false,
		});
	};
	return (
		<Dialog
			title="Add a new Note"
			cta={{
				text: "Add Note",
				action: handleSubmit,
			}}
			close={close}
		>
			<form
				className="add-note-form"
				onReset={handleReset}
				onSubmit={handleSubmit}
			>
				<Input
					name="title"
					placeholder="Note Title"
					icon="edit"
					type="text"
					autoFocus
					value={newNote.title}
					onChange={handleChange}
				/>
				<TextArea
					name="content"
					placeholder="Take a Note..."
					icon="notes"
					rows={5}
					value={newNote.content}
					onChange={handleChange}
				/>
				<div
					className="form-group"
					style={{ justifyContent: "flex-start" }}
				>
					<div className="add-note-form-group">
						<IconButton
							fill={`var(--${newNote.color}-100)`}
							icon="palette"
							onClick={(e) => {
								e.preventDefault();
								setOpenColorBox(true);
							}}
						/>
						{openColorBox && (
							<>
								<div className="add-note-color-box">
									<Row>
										{colors.map((thisColor, index) => (
											<Col
												lg={25}
												md={25}
												sm={33}
												key={index}
											>
												<button
													style={{
														width: "2rem",
														height: "2rem",
														backgroundColor: `var(--${thisColor})`,
														borderRadius: "500px",
														margin: "0.5rem",
													}}
													onClick={(e) => {
														e.preventDefault();
														setNewNote((p) => ({
															...p,
															color: thisColor,
														}));
														setOpenColorBox(false);
													}}
												></button>
											</Col>
										))}
									</Row>
								</div>
							</>
						)}
					</div>
					<div className="add-note-form-group">
						<IconButton
							fill={`var(--${newNote.color}-100)`}
							icon="image"
							onClick={(e) => {
								e.preventDefault();
								setOpenImageBox(true);
							}}
						/>
						{openImageBox && (
							<>
								<div
									className="add-note-image-box"
									style={{ width: "20rem", height: "12rem" }}
								>
									<Row>
										{notesBackgrounds.map(
											(thisImage, index) => (
												<Col
													lg={20}
													md={25}
													sm={33}
													key={index}
												>
													<button
														style={{
															width: "2.5rem",
															height: "2.5rem",
															backgroundImage: `url(https://raw.githubusercontent.com/akshatmittal61/planner/master/src/images/notes-background/${thisImage}.webp)`,
															backgroundSize:
																"cover",
															backgroundPosition:
																"center",
															backgroundRepeat:
																"no-repeat",
															borderRadius:
																"500px",
															margin: "0.5rem",
														}}
														onClick={(e) => {
															e.preventDefault();
															setNewNote((p) => ({
																...p,
																image:
																	index + 1,
															}));
															setOpenImageBox(
																false
															);
														}}
													></button>
												</Col>
											)
										)}
									</Row>
								</div>
							</>
						)}
					</div>
					<div className="add-note-form-group">
						<IconButton
							fill={`var(--${newNote.color}-100)`}
							icon="archive"
							onClick={(e) => {
								e.preventDefault();
								setNewNote((p) => ({ ...p, archived: true }));
							}}
						/>
					</div>
				</div>
				<div className="form-group">
					<Button text="Clear" type="reset" variant="outline" />
					<Button text="Add Note" type="submit" />
				</div>
			</form>
			{(openColorBox || openImageBox) && (
				<div
					className="add-note-cover"
					onClick={() => {
						setOpenColorBox(false);
						setOpenImageBox(false);
					}}
				></div>
			)}
		</Dialog>
	);
};

export default AddNote;
