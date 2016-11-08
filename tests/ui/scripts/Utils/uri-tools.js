// ===================================================================
// Library to deal with URI.
// ===================================================================

// Level 0. ----------------------------------------------------------

var URI_PCT_ENCODED = '%[A-Fa-f0-9]{2}'
var URI_PORT =  '[0-9]*'
var URI_SCHEME = '[a-zA-Z][a-zA-Z0-9+\-\.]*'
var URI_SUB_DELIMS = '[!$&\'()*+,;=]'
var URI_UNRESERVED = '[a-zA-Z0-9\-\._~]'

// Level 1. ----------------------------------------------------------

var URI_HOST = '(' +
  '(' +
    URI_UNRESERVED +
    '|' + URI_PCT_ENCODED +
    '|' + URI_SUB_DELIMS +
  ')*' +
')'

var URI_PCHAR = '(' +
  URI_UNRESERVED +
  '|' + URI_PCT_ENCODED +
  '|' + URI_SUB_DELIMS +
  '|' + '[:@]' +
')'


var URI_USERINFO = '(' +
  '(' +
    URI_UNRESERVED +
    '|' + URI_PCT_ENCODED +
    '|' + URI_SUB_DELIMS +
    '|' + ':' +
  ')*' +
')'

// Level 2. ----------------------------------------------------------

var URI_AUTHORITY = '(' +
  '(' +
    URI_USERINFO + '@' +
  ')?' + URI_HOST + '(' +
    ':' + URI_PORT +
  ')?' +
')'

var URI_FRAGMENT = '(' +
  '(' +
    URI_PCHAR +
    '|' + '[/?]' +
  ')*' +
')'


var URI_QUERY = '(' +
  '(' +
    URI_PCHAR +
    '|' + '[/?]' +
  ')*' +
')'

var URI_SEGMENT = '(' + URI_PCHAR + '*' + ')'
var URI_SEGMENT_NZ = '(' + URI_PCHAR + '+' + ')'

// Level 3. ----------------------------------------------------------

var URI_PATH_ABEMPTY = '(' + '(' + '/' + URI_SEGMENT + ')*' + ')'

var URI_PATH_ABSOLUTE = '(' +
  '/' + '(' +
    URI_SEGMENT_NZ + '(' + '/' + URI_SEGMENT + ')*' +
  ')?' +
')'

var URI_PATH_ROOTLESS = '(' +
  URI_SEGMENT_NZ + '(' + '/' + URI_SEGMENT + ')*' +
')'

// Level 4. ----------------------------------------------------------

var URI_HIER_PART = '(' +
  '//' + URI_AUTHORITY + URI_PATH_ABEMPTY +
  '|' + URI_PATH_ABSOLUTE +
  '|' + URI_PATH_ROOTLESS +
')'

// Level 5. ----------------------------------------------------------

// Regex to match URI. It respects the RFC 3986.
// But many features are not supported like IP format.
var URI = '(' +
  URI_SCHEME + ':' + URI_HIER_PART + '(' +
    '\\?' + URI_QUERY +
  ')?' + '(' + '#' + URI_FRAGMENT + ')?' +
')'

var URI_REGEX = new RegExp(URI, 'g')

// ===================================================================

function test () {
  console.log('TOTO', URI_REGEX)
  console.log('http://99w-w*w.test.com'.match(URI_REGEX))
}
test()

/*
   URI           = scheme ":" hier-part [ "?" query ] [ "#" fragment ]

   hier-part     = "//" authority path-abempty
                 / path-absolute
                 / path-rootless
                 / path-empty

   URI-reference = URI / relative-ref

   absolute-URI  = scheme ":" hier-part [ "?" query ]

   relative-ref  = relative-part [ "?" query ] [ "#" fragment ]

   relative-part = "//" authority path-abempty
                 / path-absolute
                 / path-noscheme
                 / path-empty

   scheme        = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )

   authority     = [ userinfo "@" ] host [ ":" port ]
   userinfo      = *( unreserved / pct-encoded / sub-delims / ":" )
   host          = IP-literal / IPv4address / reg-name
   port          = *DIGIT

   IP-literal    = "[" ( IPv6address / IPvFuture  ) "]"

   IPvFuture     = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )

   IPv6address   =                            6( h16 ":" ) ls32
                 /                       "::" 5( h16 ":" ) ls32
                 / [               h16 ] "::" 4( h16 ":" ) ls32
                 / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
                 / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
                 / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
                 / [ *4( h16 ":" ) h16 ] "::"              ls32
                 / [ *5( h16 ":" ) h16 ] "::"              h16
                 / [ *6( h16 ":" ) h16 ] "::"

   h16           = 1*4HEXDIG
   ls32          = ( h16 ":" h16 ) / IPv4address
   IPv4address   = dec-octet "." dec-octet "." dec-octet "." dec-octet







Berners-Lee, et al.         Standards Track                    [Page 49]


RFC 3986                   URI Generic Syntax               January 2005


   dec-octet     = DIGIT                 ; 0-9
                 / %x31-39 DIGIT         ; 10-99
                 / "1" 2DIGIT            ; 100-199
                 / "2" %x30-34 DIGIT     ; 200-249
                 / "25" %x30-35          ; 250-255

   reg-name      = *( unreserved / pct-encoded / sub-delims )

   path          = path-abempty    ; begins with "/" or is empty
                 / path-absolute   ; begins with "/" but not "//"
                 / path-noscheme   ; begins with a non-colon segment
                 / path-rootless   ; begins with a segment
                 / path-empty      ; zero characters

   path-abempty  = *( "/" segment )
   path-absolute = "/" [ segment-nz *( "/" segment ) ]
   path-noscheme = segment-nz-nc *( "/" segment )
   path-rootless = segment-nz *( "/" segment )
   path-empty    = 0<pchar>

   segment       = *pchar
   segment-nz    = 1*pchar
   segment-nz-nc = 1*( unreserved / pct-encoded / sub-delims / "@" )
                 ; non-zero-length segment without any colon ":"

   pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"

   query         = *( pchar / "/" / "?" )

   fragment      = *( pchar / "/" / "?" )

   pct-encoded   = "%" HEXDIG HEXDIG

   unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
   reserved      = gen-delims / sub-delims
   gen-delims    = ":" / "/" / "?" / "#" / "[" / "]" / "@"
   sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
                 / "*" / "+" / "," / ";" / "="

*/
