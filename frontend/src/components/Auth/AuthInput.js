export default function AuthInput ({ type, onChangeText, value }) {
  return (
    <label>
      {(() => {
        if (type === 'firstname') return 'First Name';
        if (type === 'email') return 'Email address';
        if (type === 'password') return 'Password';
        if (type === 'repeat-password') return 'Repeat Password';
      })()}
      <input
        className='auth-input'
        type={(() => {
          if (type === 'firstname') return 'text';
          if (type === 'email') return 'email';
          if (type === 'password' || type === 'repeat-password') return 'password';
        })()}
        onChange={({ target: { value } }) => onChangeText(value)}
        value={value}
        required
        placeholder={(() => {
          if (type === 'firstname') return 'First name';
          if (type === 'email') return 'user@website.com';
          if (type === 'password') return 'Password';
          if (type === 'repeat-password') return 'Repeat Password';
        })()}
      />
    </label>
  );
}
