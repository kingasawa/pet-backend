export const EXPIRE_TIME = 15 * 60 * 1000; // 15 minutes

export const JWT_SECRET_KEY = 'secretKey';
export const CIPHER_IV = 'i1fmLxXbPi3iXbFv';
export const CIPHER_KEY = 'IAMnyMmogFdJU0Q3U1cbPRfuecPky9K7';
export const CIPHER_MODE = 'aes-256-cbc';
export const ERROR_MESSAGES = {
  INVALID_DATA_INPUT: 'The input data is invalid. Please try again',
  DUPLICATE_DATA_INPUT: 'The input data is duplicate. Please try again',
  DUPLICATE_USER: 'This user has already existed. Please use another email',
  DATA_NOT_FOUND: "Data you want to find can't be found. Please try again",
  QUESTION_IS_EMPTY: 'Question must not be empty',
  USER_NOT_FOUND: 'This user is not existed, please try again',
  EMAIL_NOT_FOUND: 'Email này không tồn tại trong hệ thống.',
  QUESTION_NOT_FOUND: "Question can't be found",
  INVALID_ANSWER_MARK: 'The total mark of answers must the equal to the mark of the question',
  INVALID_DATE_TIME: 'Date time format is invalid. Please try again',
  TEST_IS_FINISHED: 'The test has already been finished',
  FORBIDDEN_EXCEPTION: 'This action is prohibited',
  QUESTION_IS_ANSWERED: 'Question has already been answered',
  QUESTION_IS_NOT_ENOUGH: 'The number of question is not enough',
  MISSING_FILE_CV: 'Please add your CV, we need it to evaluate your ability',
  MISSING_FILE_UPLOAD: 'Please add your file',
};
