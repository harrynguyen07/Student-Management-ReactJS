import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmDialog({ showModal, handleCloseDialog, handleConfirmDialog, currentID }) {
    // show hay close do cha điều khiển

    return (
        <>
            <Modal show={showModal} onHide={handleCloseDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Bạn muốn xoá phải không</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDialog}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={
                        () => { handleConfirmDialog(currentID); handleCloseDialog() }
                    }>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
