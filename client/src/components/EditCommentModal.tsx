import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

interface EditCommentModalProps {
  commentId: string;
  currentContent: string;
  onClose: () => void;
  refetchComments: () => void;
}

export const UPDATE_COMMENT_MUTATION = gql`
    mutation UpdateComment($updateCommentId: ID!, $content: String!) {
        updateComment(id: $updateCommentId, content: $content) {
            code
            comment {
            id
            }
            success
            message
        }
    }
`;

function EditCommentModal({ commentId, currentContent, onClose, refetchComments }: EditCommentModalProps) {
  const [newContent, setNewContent] = useState(currentContent);

  const [updateComment, { loading, error }] = useMutation(UPDATE_COMMENT_MUTATION, {
    onCompleted: (data) => {
      if (data.updateComment.success) {
        refetchComments(); // Rafraîchir la liste des commentaires après mise à jour
        onClose(); // Fermer le modal
      } else {
        console.error("Erreur :", data.updateComment.message);
      }
    },
    onError: (err) => console.error(err.message),
  });

  const handleSave = () => {
    updateComment({ variables: { updateCommentId: commentId, content: newContent } });
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: "rgba(0, 0, 0, .5)"}} tabIndex={-1} aria-labelledby="editCommentModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifier le commentaire</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <textarea
              className="form-control"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>
              {loading ? "Mise à jour..." : "Enregistrer"}
            </button>
          </div>
          {error && <p className="text-danger p-2">{error.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default EditCommentModal;
