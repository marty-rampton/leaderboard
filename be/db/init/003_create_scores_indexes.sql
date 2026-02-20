CREATE INDEX IF NOT EXISTS idx_scores_user_id ON scores(user_id);

CREATE INDEX IF NOT EXISTS idx_scores_score ON scores(score DESC);