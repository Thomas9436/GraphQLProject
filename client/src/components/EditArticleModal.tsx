import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation UpdateArticle($updateArticleId: ID!, $content: String, $title: String) {
    updateArticle(id: $updateArticleId, content: $content, title: $title) {
      success
      message
      article {
        id
        title
        content
        createdAt
      }
    }
  }
`;

interface EditArticleModalProps {
  articleId: string;
  currentTitle: string;
  currentContent: string;
  onClose: () => void;
  refetchArticles: () => void;
}

function EditArticleModal({ articleId, currentTitle, currentContent, onClose, refetchArticles }: EditArticleModalProps) {
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [newContent, setNewContent] = useState(currentContent);

  const [updateArticle, { loading, error }] = useMutation(UPDATE_ARTICLE_MUTATION, {
    onCompleted: (data) => {
      if (data.updateArticle.success) {
        refetchArticles(); // Rafraîchir la liste après mise à jour
        onClose(); // Fermer le modal
      } else {
        console.error("Erreur :", data.updateArticle.message);
      }
    },
    onError: (err) => console.error(err.message),
  });

  const handleSave = () => {
    updateArticle({ variables: { updateArticleId: articleId, title: newTitle, content: newContent } });
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: "rgba(0, 0, 0, .5)"}} tabIndex={-1} aria-labelledby="editCommentModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifier l'article</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Titre de l'article"
            />
            <textarea
              className="form-control"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Contenu de l'article"
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

export default EditArticleModal;
