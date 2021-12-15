import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


import useVisualMode from "../../hooks/useVisualMode.js";

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const EDIT = 'EDIT';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


export default function Appointment(props) {
  const {
    id, time, interview, interviewers, bookInterview, cancelInterview
  } = props;

  const initialVisualMode = interview ? SHOW : EMPTY;
  const {mode, back, transition} = useVisualMode(initialVisualMode);
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    bookInterview({...interview}, id).then(res => {
      transition(SHOW);
    }).catch(err => {
      transition(ERROR_SAVE, true);
    });
  }

  const destroy = (id) => {

    transition(DELETING, true);
    cancelInterview(id).then(res => {
      transition(EMPTY);
    }).catch(err => {
      transition(ERROR_DELETE, true);
    });
  }

  const emptyProps = { onAdd: () => transition(CREATE) };
  const confirmProps = {
    message: 'Are you sure?',
    onCancel: () => back(),
    onConfirm: () => destroy(id)
  }
  const showProps = {
    student: interview ? interview.student : null,
    interviewer : interview ? interview.interviewer : null,
    onEdit: () => transition(EDIT),
    onDelete: () => transition(CONFIRM)
  }

  const formProps = {
    name: interview ? interview.student : null,
    interviewer: interview ? interview.interviewer.id : null,
    interviewers,
    onSave: (name, interviewer) => save(name, interviewer),
    onCancel: () => back()
  }

  const closeProps = { onClose: () => back() }
  const errSaveProps = { ...closeProps, message: 'Error while saving' }
  const errDeleteProps = { ...closeProps, message: 'Error while deleting' }

  const showSlot = (mode) => {
    if(mode === EMPTY)
      return <Empty {...emptyProps} />;
    if (mode === SHOW) 
      return <Show {...showProps} />;
    if (mode === CREATE) 
      return <Form {...formProps} />;
    if (mode === EDIT) 
      return <Form {...formProps} />;
    if (mode === SAVING) 
      return <Status message={SAVING} />;
    if (mode === CONFIRM) 
      return <Confirm {...confirmProps} />;
    if (mode === DELETING) 
      return <Status message={DELETING} />;
    if (mode === ERROR_DELETE) 
      return <Error {...errDeleteProps} />;
    if (mode === ERROR_SAVE) 
      return <Error {...errSaveProps} />;
  
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {showSlot(mode)} 
    </article>
  );
}